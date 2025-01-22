'use client';

import React from 'react';
import { DataTable } from '../table/data-table';
import { getUsers } from './server';
import {
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './columns';
import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';
export type TData = Awaited<ReturnType<typeof getUsers>>[number];
interface UserTableProps {
  data: TData[];
}
const paginationStateSchema = z.object({
  pageIndex: z.number(),
  pageSize: z.number(),
});
const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const [pagination, setPagination] = useQueryState<PaginationState>(
    'pagination',
    parseAsJson<PaginationState>(paginationStateSchema.parse).withDefault({
      pageIndex: 0,
      pageSize: 10,
    }),
  );
  const table = useReactTable({
    state: {
      pagination,
    },

    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });
  return (
    <>
      <DataTable table={table} />
    </>
  );
};

export default UserTable;
