import { FieldSchema } from '@/lib/filters';

export const getUsersSchema = {
  id: { type: 'string' },
  name: { type: 'string' },
  salary: { type: 'number' },
  email: { type: 'string' },
  createdAt: { type: 'date' },
  updatedAt: { type: 'date' },
} satisfies FieldSchema;
