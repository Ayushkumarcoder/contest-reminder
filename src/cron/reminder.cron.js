const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const { differenceInMinutes } = require('date-fns');
const { sendTelegramMessage } = require('../services/telegram.service');

const prisma = new PrismaClient();

const checkReminders = async () => {
  console.log('⏰ Checking reminders...');
  try {
    const now = new Date();
    
    // 1. Get all users with Telegram connected
    const users = await prisma.user.findMany({
      where: { telegramChatId: { not: null } }
    });

    if (users.length === 0) {
      console.log('No users with Telegram connected.');
      return;
    }

    // 2. Get upcoming contests (next 24 hours to be safe)
    const upcomingContests = await prisma.contest.findMany({
      where: {
        startTime: {
          gt: now,
          lt: new Date(now.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    for (const contest of upcomingContests) {
      const diff = differenceInMinutes(new Date(contest.startTime), now);

      for (const user of users) {
        // Check if user wants notification for this SPECIFIC contest
        const userContest = await prisma.userContest.findUnique({
          where: { userId_contestId: { userId: user.id, contestId: contest.id } }
        });

        const shouldNotify = userContest ? userContest.notify : true; // Default to true

        if (!shouldNotify) continue;

        // Check user's preferred intervals
        const reminderIntervals = user.remindBefore || [60, 15]; // Default

        // Check if we are close to an interval (within 1 min margin)
        // Since cron runs every minute, strict equality often fails.
        // We check if `diff` matches any interval.
        if (reminderIntervals.includes(diff)) {
          // Send Message
          const msg = `🔔 <b>Reminder:</b> ${contest.name} (${contest.platform})\nStarts in <b>${diff} minutes</b>!`;
          await sendTelegramMessage(user.telegramChatId, msg);
        }
      }
    }
  } catch (error) {
    console.error('Error in reminder cron:', error);
  }
};

// Run every minute
const job = cron.schedule('* * * * *', checkReminders);

module.exports = { job, checkReminders };
