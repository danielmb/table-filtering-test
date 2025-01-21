import { FieldSchema } from '@/lib/filters';

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
