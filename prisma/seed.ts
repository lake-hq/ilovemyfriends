// prisma/seed.ts

import users from "./seed-data.json";
// const prisma = new PrismaClient();
import {prisma} from "../src/lib/prisma.js";

async function main() {
  await prisma.user.createMany({
    data: users.map(({characterCard, createdAt, ...user}) => ({
      ...user,
      createdAt: new Date(createdAt),
    })),
    skipDuplicates: true,
  });

  await prisma.characterCard.createMany({
    data: users.map(({characterCard}) => characterCard),
    skipDuplicates: true,
  });

  // Postgres only: explicit IDs don't advance the autoincrement sequence
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"))`,
  );
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(() => prisma.$disconnect());
console.log("Seeding Completed");
