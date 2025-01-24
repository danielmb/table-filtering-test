'use server';

import { type Filter, filtersToPrisma, validateFilters } from '@/lib/filters';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { getUsersSchema } from './get-users-schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { serverActionWrapper } from '@/lib/server-action-wrapper';

const prisma = new PrismaClient();

export const getUsers = async (filters: Filter[]) => {
  validateFilters(filters, getUsersSchema);
  const where = filtersToPrisma(filters, getUsersSchema);
  return prisma.user.findMany({ where: { AND: where } });
};

// dev
// export const createUser = async () =>
export const createUser = serverActionWrapper(async () => {
  const hasPermission = (await auth()).has({
    permission: 'org:user:create',
  });

  if (!hasPermission) {
    throw new Error(
      'You do not have permission to create a user, please contact your administrator.',
    );
  }

  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    },
  });
  revalidatePath('/');

  return {
    success: true,
    data: user,
  };
});
export const setRandomSalary = async (id: string) => {
  try {
    const hasPermission = (await auth()).has({
      permission: 'org:user:edit',
    });

    if (!hasPermission) {
      throw new Error(
        'You do not have permission to create a user, please contact your administrator.',
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: { salary: parseFloat(faker.finance.amount()) },
    });
    // .then(() => );
    revalidatePath('/');
    return {
      success: true,
      user,
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'An unexpected error occurred',
    };
  }
};
