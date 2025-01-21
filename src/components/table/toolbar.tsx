'use client';
import {
  getDefaultOperators,
  Operator,
  type FieldSchema,
  // type Filter // We will use this later
} from '@/lib/filters';
// to create unique ids for filters clientside, do not use uuid module use crypto
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FilterFieldProps } from './types';
import {
  BooleanInput,
  DateInput,
  InputDefaultProps,
  NumberInput,
  StringInput,
} from './toolbar-inputs';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { FilterIcon, ListFilter, TrashIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// const Toolbar = (schema: FieldSchema) => {
type OnfilterChangeFn = (filters: FilterFieldProps[]) => void;
export interface ToolbarProps {
  schema: FieldSchema;
  onFilterChange?: OnfilterChangeFn;
  defaultFilters?: FilterFieldProps[];
}

const Toolbar: React.FC<ToolbarProps> = ({
  schema,
  onFilterChange,
  defaultFilters,
}) => {
  const [filters, setFilters] = useState<FilterFieldProps[]>(
    defaultFilters ?? [],
  );
  const [selectedField, setSelectedField] = useState<keyof FieldSchema>();
  const addFilter = () => {
    if (!selectedField) {
      return;
    }
    const field = schema[selectedField];
    const defaultOperators = getDefaultOperators(field.type);
    const defualtOperator = field.allowedOperators
      ? field.allowedOperators[0]
      : defaultOperators[0];
    let defaultValue: string | number | undefined;

    if (field.type === 'string') {
      defaultValue = '';
    } else if (field.type === 'number') {
      defaultValue = 0;
    }

    setFilters([
      ...filters,
      {
        id: crypto.randomUUID(),
        schema: selectedField,
        field: selectedField,
        operator: defualtOperator,
        value: defaultValue,
      },
    ]);
  };

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const toggleEnabled = (id: string) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, disabled: !f.disabled } : f)),
    );
  };

  return (
    <div>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <ListFilter className="size-3" />
              Filters
              {filters.length > 0 && (
                <Badge variant="secondary">{filters.length}</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            collisionPadding={10}
            className={cn(
              'flex w-[calc(100vw-theme(spacing.12))] min-w-60 origin-[var(--radix-popover-content-transform-origin)] flex-col p-4 sm:w-[36rem]',
              filters.length > 0 ? 'gap-3.5' : 'gap-2',
            )}
          >
            <div>
              {filters.map((filter, i) => {
                const field = schema[filter.schema];
                const operators =
                  field.allowedOperators ?? getDefaultOperators(field.type);

                if (!field) {
                  return null;
                }
                const defaultInput = {
                  filter,
                  operators,
                  setFilters,
                  filters,
                  toggleEnabled,
                  removeFilter,
                } satisfies InputDefaultProps;

                return (
                  <div className="flex items-center space-x-2" key={filter.id}>
                    <div>
                      <span className="text-sm font-bold">
                        {i === 0 ? 'Where' : 'And'}
                      </span>
                    </div>

                    <div>
                      <Select
                        value={filter.field}
                        onValueChange={(value) => {
                          setFilters(
                            filters.map((f) =>
                              f.id === filter.id ? { ...f, field: value } : f,
                            ),
                          );
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={filter.field}>
                            {filter.field}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(schema).map((key) => (
                            <SelectItem key={key} value={key}>
                              {schema[key].label ?? key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select
                        value={filter.operator}
                        onValueChange={(value) => {
                          setFilters(
                            filters.map((f) =>
                              f.id === filter.id
                                ? { ...f, operator: value as Operator }
                                : f,
                            ),
                          );
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={filter.operator}>
                            {filter.operator}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {operators.map((operator) => (
                            <SelectItem key={operator} value={operator}>
                              {operator}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      {field.type === 'string' && (
                        <StringInput key={filter.id} {...defaultInput} />
                      )}
                      {field.type === 'number' && (
                        <NumberInput key={filter.id} {...defaultInput} />
                      )}
                      {field.type === 'boolean' && (
                        <BooleanInput key={filter.id} {...defaultInput} />
                      )}
                      {field.type === 'date' && (
                        <DateInput key={filter.id} {...defaultInput} />
                      )}
                    </div>
                    <div>
                      <Button onClick={() => removeFilter(filter.id)}>
                        <TrashIcon className="size-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-start">
              <Button onClick={addFilter}>Add Filter</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Toolbar;
