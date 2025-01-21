import { Filter } from '@/lib/filters';
import { FilterFieldProps } from './toolbar';

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
