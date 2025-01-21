'use client';

import React from 'react';
import { DataTable } from '../table/data-table';
import { getUsers } from './server';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';

export type TData = Awaited<ReturnType<typeof getUsers>>[number];
interface UserTableProps {
  data: TData[];
}
const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} />
    </>
  );
};

export default UserTable;
