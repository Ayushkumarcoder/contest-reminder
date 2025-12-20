const cron = require('node-cron');
const prisma = require('../config/db');
const { fetchCodeforcesContests } = require('../services/codeforces.service');
const { fetchCodeChefContests } = require('../services/codechef.service');
const { fetchLeetCodeContests } = require('../services/leetcode.service');

const fetchAndStoreContests = async () => {
  console.log('🔄 Fetching contests...');
  
  try {
    const [cf, cc, lc] = await Promise.all([
      fetchCodeforcesContests(),
      fetchCodeChefContests(),
      fetchLeetCodeContests()
    ]);

    const allContests = [...cf, ...cc, ...lc];
    console.log(`✅ Fetched ${allContests.length} contests coming up.`);

    for (const contest of allContests) {
      // Upsert to database
      await prisma.contest.upsert({
        where: {
          platform_name_startTime: {
            platform: contest.platform,
            name: contest.name,
            startTime: contest.startTime
          }
        },
        update: {
          endTime: contest.endTime,
          durationMin: contest.durationMin,
          url: contest.url,
          isRated: contest.isRated,
          // Don't update reminderSent if it exists
        },
        create: {
          platform: contest.platform,
          name: contest.name,
          startTime: contest.startTime,
          endTime: contest.endTime,
          durationMin: contest.durationMin,
          url: contest.url,
          isRated: contest.isRated,
          reminderSent: false
        }
      });
    }

    console.log('💾 Contests updated in database.');
  } catch (error) {
    console.error('❌ Error in fetch cron:', error);
  }
};

// Run every 6 hours
const job = cron.schedule('0 */6 * * *', fetchAndStoreContests);

module.exports = { job, fetchAndStoreContests };
