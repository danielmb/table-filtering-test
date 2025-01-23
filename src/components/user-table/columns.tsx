import type { ColumnDef } from '@tanstack/react-table';
import { TData } from './data-table';
import SetRandomSalaryButton from './components/set-salary';
import { createSelectColumn } from '../table/table-select-column';
import { DataTableColumnHeader } from '../table/data-table-column-header';
export const columns = [
  createSelectColumn({ id: 'select' }),

  {
    // header: 'ID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    accessorKey: 'id',
  },
  {
    // header: 'Name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    accessorKey: 'name',
  },
  {
    // header: 'Email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    accessorKey: 'email',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    accessorKey: 'salary',
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="actions" />
    ),
    cell: ({ row }) => {
      return <SetRandomSalaryButton id={row.original.id} />;
    },
  },
] as const satisfies ColumnDef<TData>[];
