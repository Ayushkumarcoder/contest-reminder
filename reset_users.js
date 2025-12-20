const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetUser() {
  console.log('🧹 Resetting Users to force re-auth...');
  // Delete all users so they must login again and get new tokens
  const deleted = await prisma.user.deleteMany({});
  console.log(`✅ Deleted ${deleted.count} users.`);
}

resetUser()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
