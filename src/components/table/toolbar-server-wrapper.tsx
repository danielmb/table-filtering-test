'use client';

import React from 'react';
import Toolbar, { ToolbarProps } from './toolbar';
import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { revalidatePathClient } from '@/lib/revalidate-client';
import { parseFilters } from './parser';
import { FilterFieldProps } from './types';
import { useDebounce } from '@uidotdev/usehooks';

interface ToolbarServerWrapperProps {
  schema: ToolbarProps['schema'];
}

export const ToolbarServerWrapper: React.FC<ToolbarServerWrapperProps> = ({
  schema,
}) => {
  // const [filters, setFilters] = useState<FilterFieldProps[]>([]);
  const [filters, setFilters] = useQueryState(
    'filters',
    parseFilters(schema).withDefault([]),
  );
  const debouncedFilters = useDebounce(filters, 500);
  const pathname = usePathname();

  const onFilterChange = async (filters: FilterFieldProps[]) => {
    await setFilters(filters);
    revalidatePathClient(pathname);
  };

  return (
    <Toolbar
      schema={schema}
      onFilterChange={onFilterChange}
      defaultFilters={debouncedFilters}
    />
  );
};
