'use server';

import { type Filter, filtersToPrisma, validateFilters } from '@/lib/filters';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { getUsersSchema } from './get-users-schema';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const getUsers = async (filters: Filter[]) => {
  validateFilters(filters, getUsersSchema);
  const where = filtersToPrisma(filters, getUsersSchema);
  return prisma.user.findMany({ where: { AND: where } });
};

// dev
export const createUser = async () => {
  return prisma.user
    .create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    })
    .then(() => revalidatePath('/'));
};

export const setRandomSalary = async (id: string) => {
  return prisma.user
    .update({
      where: { id },
      data: { salary: parseFloat(faker.finance.amount()) },
    })
    .then(() => revalidatePath('/'));
};
