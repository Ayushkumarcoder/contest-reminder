const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.contest.count();
  console.log(`Contests in DB: ${count}`);
  
  if (count > 0) {
    const contests = await prisma.contest.findMany({ take: 3 });
    console.log('Sample Contests:', contests);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
