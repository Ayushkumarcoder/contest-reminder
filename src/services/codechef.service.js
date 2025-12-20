const axios = require('axios');
const normalizeContest = require('../utils/normalizeContest');

const fetchCodeChefContests = async () => {
  try {
    const response = await axios.get('https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all');
    
    // CodeChef API structure usually has present_contests and future_contests
    const { future_contests } = response.data;
    
    if (!future_contests) {
      return [];
    }

    const contests = future_contests.map(contest => {
      const startTime = new Date(contest.contest_start_date_iso);
      const endTime = new Date(contest.contest_end_date_iso);
      const durationMin = contest.contest_duration; // Check if this is in minutes. key is usually in minutes.

      // Rated checking
      // CodeChef usually has 'contest_code' or explicit rating details, but simpler check is naming convention for MVP
      // Starters, Cook-Off, Long, Lunchtime are typical rated ones.
      const isRated = /Starters|Cook-Off|Long|Lunchtime/i.test(contest.contest_name);

      return normalizeContest({
        platform: 'CodeChef',
        name: contest.contest_name,
        startTime: startTime,
        endTime: endTime,
        durationMin:  parseInt(durationMin, 10),
        url: `https://www.codechef.com/${contest.contest_code}`,
        isRated: isRated
      });
    });

    return contests;
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error.message);
    return [];
  }
};

module.exports = { fetchCodeChefContests };
