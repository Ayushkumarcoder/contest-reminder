const { PrismaClient } = require('@prisma/client');
const { checkReminders } = require('./src/cron/reminder.cron');

const prisma = new PrismaClient();

async function testReminder() {
  console.log('🧪 Setting up test case for reminder cron...');

  // 1. Find a contest (or create one)
  let contest = await prisma.contest.findFirst();
  
  if (!contest) {
    // Create dummy if none
    contest = await prisma.contest.create({
      data: {
        platform: 'TestPlatform',
        name: 'Test Contest',
        startTime: new Date(Date.now() + 10000000), // far future
        endTime: new Date(Date.now() + 10000000 + 3600000),
        durationMin: 60,
        url: 'http://example.com',
        isRated: false
      }
    });
  }

  // 2. Modify startTime to be NOW + 10 minutes
  const now = new Date();
  const testTime = new Date(now.getTime() + 10 * 60000); // 10 mins from now
  
  console.log(`📝 Updating contest "${contest.name}" to start at ${testTime.toISOString()} (10 mins from now)`);
  
  await prisma.contest.update({
    where: { id: contest.id },
    data: {
      startTime: testTime,
      reminderSent: false // Ensure it's false
    }
  });

  console.log('🔄 Triggering reminder logic manually...');
  await checkReminders();
  
  // 3. Cleanup (optional, or just leave it)
  // await prisma.contest.update({ where: { id: contest.id }, data: { startTime: contest.startTime } });
}

testReminder()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
