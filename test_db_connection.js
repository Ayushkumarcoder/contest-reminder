const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.contest.count();
    console.log(`✅ Connection successful! Contests in DB: ${count}`);
  } catch (e) {
    console.error('❌ Connection failed:', e.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
