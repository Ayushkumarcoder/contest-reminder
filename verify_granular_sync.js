const { PrismaClient } = require('@prisma/client');
const { insertEvent, deleteEvent } = require('./src/services/googleCalendar.service');

const prisma = new PrismaClient();

async function verifyGranularSync() {
  console.log('🧪 Verifying Granular Sync Logic...');

  // 1. Get User
  const user = await prisma.user.findFirst({
    where: { googleId: { not: null } }
  });

  if (!user) {
    console.error('❌ No user found. Login via UI first.');
    process.exit(1);
  }
  console.log(`👤 User: ${user.email}`);

  // 2. Get Contest
  const contest = await prisma.contest.findFirst({
    where: { startTime: { gte: new Date() } }
  });

  if (!contest) {
    console.error('❌ No contest found.');
    process.exit(1);
  }
  console.log(`📅 Contest: ${contest.name}`);

  try {
    // 3. Insert Event (Sync)
    console.log('🔄 internal: Testing insertEvent...');
    const event = await insertEvent(user, contest);
    console.log(`✅ Inserted ID: ${event.id}`);

    // Simulate DB update (just verification script)
    // In real app, API does this.

    // 4. Delete Event (Unsync)
    console.log('🔄 internal: Testing deleteEvent...');
    await deleteEvent(user, event.id);
    console.log('✅ Deleted successfully.');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyGranularSync();
