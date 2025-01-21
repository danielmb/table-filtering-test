import { Filter } from '@/lib/filters';
import { FilterFieldProps } from './types';

export const filterFieldtoFilter = (
  filter: FilterFieldProps,
): Filter | null => {
  if (!filter.operator) {
    return null;
  }
  if (filter.disabled) {
    return null;
  }
  return {
    field: filter.field,
    operator: filter.operator,
    value: filter.value,
  };
};

export const filterFieldstoFilters = (
  filters: FilterFieldProps[],
): Filter[] => {
  return filters.map(filterFieldtoFilter).filter((f) => f !== null) as Filter[];
};

export const searchParamsToFilters = (searchParams: {
  [key: string]: string;
}): Filter[] => {
  const filters: Filter[] = [];
  for (const key in searchParams) {
    const [field, operator] = key.split('[');
    const v = JSON.parse(searchParams[key]);
    if (operator) {
      filters.push({
        field,
        operator: operator.slice(0, -1) as Filter['operator'],
        value: v,
      });
    }
  }

  return filters;
};
