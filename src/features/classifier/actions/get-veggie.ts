"use server";

import { prisma } from "@/lib/prisma";

export const getVeggie = async (name: string) => {
  const veggie = await prisma.veggies.findFirst({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });

  if (!veggie) {
    return null;
  }

  return { ...veggie };
};
