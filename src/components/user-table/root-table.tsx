import React from 'react';
import { getUsers } from './server';
// import SetRandomSalaryButton from './components/set-salary';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
import { Filter, validateFilters } from '@/lib/filters';
import { getUsersSchema } from './get-users-schema';
import UserTable from './data-table';
interface UsersTableProps {
  filters: Filter[];
}
const UsersRootTable: React.FC<UsersTableProps> = async ({ filters }) => {
  let error: Error | null = null;
  try {
    validateFilters(filters, getUsersSchema);
  } catch (e) {
    if (e instanceof Error) {
      error = e;
    } else {
      error = new Error('Unknown error');
    }
  }
  const users = !error ? await getUsers(filters) : [];
  return (
    <>
      {error && <div>{error.message}</div>}
      <UserTable data={users} />
    </>
  );
};

export default UsersRootTable;
