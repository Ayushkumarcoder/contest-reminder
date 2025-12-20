const axios = require('axios');
const normalizeContest = require('../utils/normalizeContest');

const fetchCodeforcesContests = async () => {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    const contests = response.data.result;

    const upcomingContests = contests
      .filter(contest => contest.phase === 'BEFORE')
      .map(contest => {
        const startTime = new Date(contest.startTimeSeconds * 1000);
        const durationMin = contest.durationSeconds / 60;
        const endTime = new Date(startTime.getTime() + contest.durationSeconds * 1000);
        const name = contest.name;
        
        // Rated if name contains "Div."
        const isRated = name.includes('Div.');
        
        return normalizeContest({
          platform: 'Codeforces',
          name: name,
          startTime: startTime,
          endTime: endTime,
          durationMin: durationMin,
          url: `https://codeforces.com/contest/${contest.id}`,
          isRated: isRated
        });
      });

    return upcomingContests;
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error.message);
    return [];
  }
};

module.exports = { fetchCodeforcesContests };
