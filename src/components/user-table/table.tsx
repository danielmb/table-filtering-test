import React from 'react';
import { getUsers } from './server';
import CreateUserButton from './components/create-user-button';
import SetRandomSalaryButton from './components/set-salary';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Filter, validateFilters } from '@/lib/filters';
import { getUsersSchema } from './get-users-schema';
import { ToolbarServerWrapper } from '../table/toolbar-server-wrapper';
interface UsersTableProps {
  filters: Filter[];
}
const UsersTable: React.FC<UsersTableProps> = async ({ filters }) => {
  // const filters = [
  //   // {
  //   //   field: 'name',
  //   //   operator: 'contains',
  //   //   value: 'Fran',
  //   // },
  //   // {
  //   //   field: 'createdAt',
  //   //   operator: '>',
  //   //   // value: new Date('2025-01-21'),
  //   //   value: '2025-01-20 22:58:55',
  //   // },
  //   // {
  //   //   field: 'createdAt',
  //   //   operator: '<',
  //   //   // value: new Date('2025-01-21'),
  //   //   value: new Date(), // now
  //   // },
  // ] satisfies Filter[];
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
      <ToolbarServerWrapper schema={getUsersSchema} />
      <Table>
        <TableCaption>Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.salary}</TableCell>
              <TableCell>
                <SetRandomSalaryButton id={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: {users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <CreateUserButton />
    </>
  );
};

export default UsersTable;
