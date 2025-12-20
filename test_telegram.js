require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { sendTelegramMessage } = require('./src/services/telegram.service');
const prisma = new PrismaClient();

const testNotification = async () => {
  try {
    console.log('🧪 Starting Telegram Notification Test...');

    // 1. Get the first user with Telegram linked
    const user = await prisma.user.findFirst({
      where: { telegramChatId: { not: null } }
    });

    if (!user) {
      console.error('❌ No user found with Telegram linked. Please connect Telegram first.');
      process.exit(1);
    }
    console.log(`👤 Found User: ${user.email} (Chat ID: ${user.telegramChatId})`);

    // 2. Get a contest they are watching (notify=true)
    // If no specific watch, we can just pick any upcoming contest and force send.
    // But let's try to find one they enabled.
    const userContest = await prisma.userContest.findFirst({
      where: { userId: user.id, notify: true },
      include: { contest: true }
    });

    let contest;
    if (userContest) {
      contest = userContest.contest;
      console.log(`🔔 User has explicitly enabled notifications for: ${contest.name}`);
    } else {
      // Fallback: Pick first upcoming contest
      console.log('⚠️ No explicit "watched" contest found. Picking the first upcoming one for test.');
      contest = await prisma.contest.findFirst({
        where: { startTime: { gte: new Date() } }
      });
    }

    if (!contest) {
      console.error('❌ No upcoming contests found in DB to test with.');
      process.exit(1);
    }

    console.log(`📨 Sending Test Notification for: ${contest.name}...`);
    
    // 3. Send Message
    const msg = `🔔 <b>TEST NOTIFICATION:</b> ${contest.name} (${contest.platform})\nThis is a simulation of the reminder bell.`;
    await sendTelegramMessage(user.telegramChatId, msg);

    console.log('✅ Message sent to Telegram API.');
    console.log('❓ Did you receive it?');

  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
};

testNotification();
