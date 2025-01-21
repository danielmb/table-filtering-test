'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { Operator } from '@/lib/filters';
import { FilterFieldProps } from './types';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
export interface InputDefaultProps {
  filter: FilterFieldProps;
  operators: Operator[];
  setFilters: (filters: FilterFieldProps[]) => void;
  filters: FilterFieldProps[];
  toggleEnabled: (id: string) => void;
  removeFilter: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ActionsProps extends InputDefaultProps {}
const Actions: React.FC<ActionsProps> = ({
  filter,
  filters,
  setFilters,
  toggleEnabled,
  removeFilter,
}) => (
  <>
    <Button onClick={() => toggleEnabled(filter.id)}>
      {filter.disabled ? 'Enable' : 'Disable'}
    </Button>
    <Button onClick={() => removeFilter(filter.id)}>
      <Delete />
    </Button>
    {
      // only show this button if the filter is not already null, and
      // if operator: 'is' or 'not' is selected
    }
    {filter.value !== null && ['is', 'not'].includes(filter.operator ?? '') && (
      <Button
        onClick={() => {
          const newFilters = filters.map((f) =>
            f.id === filter.id ? { ...f, value: null } : f,
          );
          setFilters(newFilters as FilterFieldProps[]);
        }}
      >
        Set to Null
      </Button>
    )}
  </>
);
const OperatorSelect: React.FC<InputDefaultProps> = ({
  filter,
  operators,
  setFilters,
  filters,
}) => (
  <Select
    value={filter.operator}
    onValueChange={(value) => {
      const newFilters = filters.map((f) =>
        f.id === filter.id ? { ...f, operator: value as Operator } : f,
      );
      setFilters(newFilters);
    }}
  >
    {/* {operators.map((operator) => (
      <option key={operator} value={operator}>
        {operator}
      </option>
    ))} */}
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {operators.map((operator) => (
          <SelectItem key={operator} value={operator}>
            <SelectLabel>{operator}</SelectLabel>
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NumberInputProps extends InputDefaultProps {}
export const NumberInput: React.FC<NumberInputProps> = ({
  filter,
  operators,
  setFilters,
  filters,
  toggleEnabled,
  removeFilter,
}) => {
  return (
    // <li
    //   key={filter.id}
    //   className={cn('flex flex-row space-x-2 align-middle content-center', {
    //     'opacity-50': filter.disabled,
    //   })}
    // >
    //   <p>{filter.field}</p>
    //   {/* <select
    //     value={filter.operator}
    //     onChange={(e) => {
    //       const newFilters = filters.map((f) =>
    //         f.id === filter.id
    //           ? { ...f, operator: e.target.value as Operator }
    //           : f,
    //       );
    //       setFilters(newFilters);
    //     }}
    //   >
    //     {operators.map((operator) => (
    //       <option key={operator} value={operator}>
    //         {operator}
    //       </option>
    //     ))}
    //   </select> */}
    //   <OperatorSelect
    //     filter={filter}
    //     operators={operators}
    //     setFilters={setFilters}
    //     filters={filters}
    //     removeFilter={removeFilter}
    //     toggleEnabled={toggleEnabled}
    //   />
    //   <div className="relative">
    //     <input
    //       type="number"
    //       value={filter.value ?? ''}
    //       onChange={(e) => {
    //         const newFilters = filters.map((f) =>
    //           f.id === filter.id
    //             ? { ...f, value: parseFloat(e.target.value) }
    //             : f,
    //         );
    //         setFilters(newFilters);
    //       }}
    //     />
    //     {
    //       // if is null
    //       filter.value === null && (
    //         <div className="absolute top-0 right-0 bottom-0 flex items-center px-2 pointer-events-none">
    //           <p>Null</p>
    //         </div>
    //       )
    //     }
    //   </div>

    //   <Actions
    //     filter={filter}
    //     toggleEnabled={toggleEnabled}
    //     removeFilter={removeFilter}
    //     filters={filters}
    //     operators={operators}
    //     setFilters={setFilters}
    //   />
    // </li>
    <div className="relative">
      <Input
        type="number"
        value={filter.value ?? ''}
        onChange={(e) => {
          const newFilters = filters.map((f) =>
            f.id === filter.id
              ? { ...f, value: parseFloat(e.target.value) }
              : f,
          );
          setFilters(newFilters);
        }}
      />
      {
        // if is null
        filter.value === null && (
          <div className="absolute top-0 right-0 bottom-0 flex items-center px-2 pointer-events-none">
            <p>Null</p>
          </div>
        )
      }
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StringInputProps extends InputDefaultProps {}

export const StringInput: React.FC<StringInputProps> = ({
  filter,
  filters,
  setFilters,
}) => {
  return (
    // <li key={filter.id} className="flex flex-row space-x-2">

    <div className="relative">
      <Input
        value={filter.value ?? ''}
        onChange={(e) => {
          const newFilters = filters.map((f) =>
            f.id === filter.id ? { ...f, value: e.target.value } : f,
          );
          setFilters(newFilters);
        }}
      />
      {
        // if is null
        filter.value === null && (
          <div className="absolute top-0 right-0 bottom-0 flex items-center px-2 pointer-events-none">
            <p>Null</p>
          </div>
        )
      }
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BooleanInputProps extends InputDefaultProps {}
export const BooleanInput: React.FC<BooleanInputProps> = ({
  filter,
  filters,
  setFilters,
}) => {
  return (
    <Select
      value={filter.value?.toString()}
      onValueChange={(value) => {
        const newFilters = filters.map((f) =>
          f.id === filter.id ? { ...f, value } : f,
        );
        setFilters(newFilters);
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="true">
            <SelectLabel>True</SelectLabel>
          </SelectItem>
          <SelectItem value="false">
            <SelectLabel>False</SelectLabel>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DateInputProps extends InputDefaultProps {}
export const DateInput: React.FC<DateInputProps> = ({
  filter,
  filters,
  setFilters,
}) => {
  return (
    <Input
      type="date"
      value={filter.value}
      onChange={(e) => {
        const newFilters = filters.map((f) =>
          f.id === filter.id ? { ...f, value: e.target.value } : f,
        );
        setFilters(newFilters);
      }}
    />
  );
};
