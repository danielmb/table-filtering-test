import React from 'react';
import { flexRender, type Table as TanstackTable } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DataTablePagination from './data-table-pagination';

interface DataTableProps<TData> {
  table: TanstackTable<TData>;
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;
  const currentRows = table.getRowModel().rows?.length ?? 0;
  const emptyRows = Math.max(0, pageSize - currentRows);

  return (
    <div className="w-full space-y-2.5">
      <div className="relative rounded-md border overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 whitespace-nowrap"
                    style={{ width: `${100 / table.getAllColumns().length}%` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="h-12"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {emptyRows > 0 &&
                  Array.from({ length: emptyRows }).map((_, index) => (
                    <TableRow key={`empty-${index}`} className="h-12">
                      {table.getAllColumns().map((column) => (
                        <TableCell key={column.id} />
                      ))}
                    </TableRow>
                  ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-[384px] text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row items-center justify-between px-2 py-4">
        <div className="text-sm text-gray-500">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
