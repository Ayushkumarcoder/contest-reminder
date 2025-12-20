require('dotenv').config();
const app = require('./app');
const { job: fetchJob, fetchAndStoreContests } = require('./cron/fetchContests.cron');
const { job: reminderJob } = require('./cron/reminder.cron');

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Initial fetch on startup (optional, but good for testing)
  // await fetchAndStoreContests(); 
  // Commented out to respect the cron schedule strictly, 
  // but usually good to have one run on start. 
  // User instructions say "Runs every 6 hours", doesn't explicitly say "and on startup".
  // However, MVP acceptance says "Contests are stored in DB", implies we need data.
  // I will trigger it once purely for the "MVP check" to make sure we have data, 
  // but strictly it's a cron. Let's leave it to the cron or manual trigger.
  // Actually, for "Vibe Coding", "It works immediately" is better.
  console.log('🚀 Triggering initial contest fetch...');
  fetchAndStoreContests();

  console.log('📅 Cron jobs scheduled:');
  console.log('   - Fetch Contests: Every 6 hours');
  console.log('   - Reminders: Every 5 minutes');
});
