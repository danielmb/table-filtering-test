'use client';

import React from 'react';
import Toolbar, { FilterFieldProps, ToolbarProps } from './toolbar';
import { usePathname } from 'next/navigation';
import { parseAsJson, useQueryState } from 'nuqs';
import { revalidatePathClient } from '@/lib/revalidate-client';

interface ToolbarServerWrapperProps {
  schema: ToolbarProps['schema'];
}

export const ToolbarServerWrapper: React.FC<ToolbarServerWrapperProps> = ({
  schema,
}) => {
  const [filters, setFilters] = useQueryState<FilterFieldProps[]>(
    'filters',
    parseAsJson<FilterFieldProps[]>(
      (value) => value as FilterFieldProps[],
    ).withDefault([]),
  );
  const pathname = usePathname();
  const onFilterChange = async (filters: FilterFieldProps[]) => {
    await setFilters(filters);
    revalidatePathClient(pathname);
  };
  return <Toolbar schema={schema} onFilterChange={onFilterChange} />;
};
