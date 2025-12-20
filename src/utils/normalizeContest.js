/**
 * Normalizes contest data into a common format.
 * @param {string} platform - "Codeforces", "CodeChef", or "LeetCode"
 * @param {string} name - Contest name
 * @param {Date} startTime - Start time object
 * @param {Date} endTime - End time object
 * @param {number} durationMin - Duration in minutes
 * @param {string} url - Contest URL
 * @param {boolean} isRated - Whether the contest is rated
 * @returns {object} Normalized contest object
 */
const normalizeContest = ({ platform, name, startTime, endTime, durationMin, url, isRated }) => {
  return {
    platform,
    name,
    startTime,
    endTime,
    durationMin,
    url,
    isRated
  };
};

module.exports = normalizeContest;
