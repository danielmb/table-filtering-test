import { FieldSchema, SortKeyMap } from '@/lib/filters';
import { Prisma } from '@prisma/client';
export const getUsersSchema = {
  id: {
    type: 'string',
    label: 'Id',
  },
  name: {
    type: 'string',
    label: 'Name',
  },
  salary: {
    type: 'number',
    label: 'Salary',
  },
  email: {
    type: 'string',
    label: 'Email',
  },
  createdAt: {
    type: 'date',
    label: 'Created At',
  },
  updatedAt: {
    type: 'date',
    label: 'Updated At',
  },
} satisfies FieldSchema;

export const gUsersSortSchema = {
  id: {
    ascending: { id: 'asc' },
    descending: { id: 'desc' },
  },
  name: {
    ascending: { name: 'asc' },
    descending: { name: 'desc' },
  },
  salary: {
    ascending: { salary: 'asc' },
    descending: { salary: 'desc' },
  },
  email: {
    ascending: { email: 'asc' },
    descending: { email: 'desc' },
  },
  createdAt: {
    ascending: { createdAt: 'asc' },
    descending: { createdAt: 'desc' },
  },
  updatedAt: {
    ascending: { updatedAt: 'asc' },
    descending: { updatedAt: 'desc' },
  },
} as const satisfies SortKeyMap<Prisma.UserFindManyArgs['orderBy']>;
