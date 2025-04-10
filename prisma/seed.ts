import { PrismaClient } from "@prisma/client";

import { initialVeggies } from "./data/vegies";

const prisma = new PrismaClient();

const seed = async () => {
  const t0 = performance.now();

  await prisma.veggies.deleteMany();
  await prisma.veggies.createMany({
    data: initialVeggies,
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished in ${Math.round(t1 - t0)}ms`);
};

// Run the seeding process
seed()
  .catch((error) => {
    console.error("Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });