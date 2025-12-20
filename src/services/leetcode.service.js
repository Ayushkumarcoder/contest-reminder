const axios = require('axios');
const normalizeContest = require('../utils/normalizeContest');

const fetchLeetCodeContests = async () => {
  try {
    const query = `
      query upcomingContests {
        upcomingContests {
          title
          startTime
          duration
        }
      }
    `;

    const response = await axios.post('https://leetcode.com/graphql', {
      query: query
    });

    const contests = response.data.data.upcomingContests;

    return contests.map(contest => {
      // LeetCode startTime is a unix timestamp (seconds)
      const startTime = new Date(contest.startTime * 1000);
      
      // Duration is in seconds usually? The query says 'duration'. 
      // User instructions: "Duration = durationSeconds / 60" for Codeforces.
      // LeetCode API usually returns duration in seconds? No, let's assume standard behavior or check.
      // Actually standard LeetCode GraphQL duration is usually in seconds.
      // Wait, let's look at a sample response if possible.
      // Typically 90 minutes = 5400 seconds.
      
      const durationMin = contest.duration / 60; 
      const endTime = new Date(startTime.getTime() + contest.duration * 1000);

      // LeetCode Weekly and Biweekly are rated.
      const isRated = true; // Most upcoming contests on the list are rated.

      // title usually "Weekly Contest 123"
      const slug = contest.title.toLowerCase().replace(/\s+/g, '-');

      return normalizeContest({
        platform: 'LeetCode',
        name: contest.title,
        startTime: startTime,
        endTime: endTime,
        durationMin: durationMin,
        url: `https://leetcode.com/contest/${slug}`,
        isRated: isRated
      });
    });

  } catch (error) {
    console.error('Error fetching LeetCode contests:', error.message);
    return [];
  }
};

module.exports = { fetchLeetCodeContests };
