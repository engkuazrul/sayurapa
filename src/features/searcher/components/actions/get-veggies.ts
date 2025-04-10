"use server";

import { prisma } from "@/lib/prisma";

export const getVeggies = async (name: string) => {
  const veggies = await prisma.veggies.findMany({
    where: {
      OR: [
        {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          nameBm: {
            contains: name,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  if (veggies.length === 0) {
    return [];
  }

  return veggies;
};
