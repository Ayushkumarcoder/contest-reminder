const { PrismaClient } = require('@prisma/client');
const { insertEvent } = require('./src/services/googleCalendar.service');

const prisma = new PrismaClient();

async function debugSync() {
  console.log('🔍 Starting Debug Sync...');

  // 1. Get first user with googleId
  const user = await prisma.user.findFirst({
    where: { googleId: { not: null } }
  });

  if (!user) {
    console.error('❌ No user found with Google ID. Please login via UI first.');
    process.exit(1);
  }

  console.log(`👤 Found User: ${user.email} (${user.id})`);
  console.log(`🔑 Access Token present: ${!!user.accessToken}`);
  console.log(`🔑 Refresh Token present: ${!!user.refreshToken}`);

  // 2. Fetch one upcoming contest
  const contest = await prisma.contest.findFirst({
    where: { startTime: { gte: new Date() } }
  });

  if (!contest) {
    console.error('❌ No upcoming contests found in DB.');
    process.exit(1);
  }

  console.log(`📅 Found Contest: ${contest.name}`);

  // 3. Try Insert
  try {
    console.log('🚀 Attempting Google Calendar Insert...');
    const result = await insertEvent(user, contest);
    console.log('✅ Success!', result.htmlLink);
  } catch (error) {
    console.error('❌ Insert Failed!');
    console.error('Error Message:', error.message);
    if (error.response) {
      console.error('API Response Config:', JSON.stringify(error.response.data, null, 2));
    }
  } finally {
    await prisma.$disconnect();
  }
}

debugSync();
