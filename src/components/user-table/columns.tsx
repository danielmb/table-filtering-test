import type { ColumnDef } from '@tanstack/react-table';
import { TData } from './data-table';
import SetRandomSalaryButton from './components/set-salary';
export const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Salary',
    accessorKey: 'salary',
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      return <SetRandomSalaryButton id={row.original.id} />;
    },
  },
] as const satisfies ColumnDef<TData>[];
