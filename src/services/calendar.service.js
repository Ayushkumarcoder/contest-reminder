const ics = require('ics');

/**
 * Generates an ICS string from a list of contests.
 * @param {Array} contests 
 * @returns {Promise<string>}
 */
const generateICS = (contests) => {
  return new Promise((resolve, reject) => {
    if (!contests || contests.length === 0) {
      resolve('');
      return;
    }

    const events = contests.map(contest => {
      const start = new Date(contest.startTime);
      const durationHours = Math.floor(contest.durationMin / 60);
      const durationMinutes = contest.durationMin % 60;
      
      return {
        start: [start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes()],
        duration: { hours: durationHours, minutes: durationMinutes },
        title: `${contest.platform}: ${contest.name}`,
        description: `Contest Link: ${contest.url}\nRated: ${contest.isRated ? 'Yes' : 'No'}`,
        url: contest.url,
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        alarms: [
          { action: 'display', description: 'Reminder', trigger: { minutes: 60, before: true } },
          { action: 'display', description: 'Starting soon', trigger: { minutes: 15, before: true } }
        ]
      };
    });

    ics.createEvents(events, (error, value) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(value);
    });
  });
};

module.exports = { generateICS };
