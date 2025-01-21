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
import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterFieldProps {
  id: string;
  schema: keyof FieldSchema;
  field: string;
  value?: string | number;
  operator?: Operator;
  disabled?: boolean;
}
// const Toolbar = (schema: FieldSchema) => {
type OnfilterChangeFn = (filters: FilterFieldProps[]) => void;
export interface ToolbarProps {
  schema: FieldSchema;
  onFilterChange?: OnfilterChangeFn;
}
const Toolbar: React.FC<ToolbarProps> = ({ schema, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterFieldProps[]>([]);
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
        {/* Add */}
        <select
          value={selectedField}
          onChange={(e) =>
            setSelectedField(e.target.value as keyof FieldSchema)
          }
        >
          {Object.keys(schema).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button onClick={addFilter}>Add</button>
      </div>
      <div>
        <h2>Filters</h2>
        <ul>
          {filters.map((filter) => {
            const field = schema[filter.schema];
            const operators =
              field.allowedOperators ?? getDefaultOperators(field.type);
            if (!field) {
              return null;
            }
            // these should be in a separate component, i'm just lazy
            // also missing a few operators
            if (field.type === 'string') {
              return (
                // <li key={filter.id} className="flex flex-row space-x-2">
                <li
                  key={filter.id}
                  className={cn('flex flex-row space-x-2', {
                    'opacity-50': filter.disabled,
                  })}
                >
                  <p>{filter.field}</p>
                  <select
                    value={filter.operator}
                    onChange={(e) => {
                      const newFilters = filters.map((f) =>
                        f.id === filter.id
                          ? { ...f, operator: e.target.value as Operator }
                          : f,
                      );
                      setFilters(newFilters);
                    }}
                  >
                    {operators.map((operator) => (
                      <option key={operator} value={operator}>
                        {operator}
                      </option>
                    ))}
                  </select>
                  <input
                    value={filter.value}
                    onChange={(e) => {
                      const newFilters = filters.map((f) =>
                        f.id === filter.id
                          ? { ...f, value: e.target.value }
                          : f,
                      );
                      setFilters(newFilters);
                    }}
                  />
                  <Button onClick={() => toggleEnabled(filter.id)}>
                    {filter.disabled ? 'Enable' : 'Disable'}
                  </Button>
                  <Button onClick={() => removeFilter(filter.id)}>
                    <Delete />
                  </Button>
                </li>
              );
            }
            if (field.type === 'number') {
              return (
                <li
                  key={filter.id}
                  className={cn('flex flex-row space-x-2', {
                    'opacity-50': filter.disabled,
                  })}
                >
                  <p>{filter.field}</p>
                  <select
                    value={filter.operator}
                    onChange={(e) => {
                      const newFilters = filters.map((f) =>
                        f.id === filter.id
                          ? { ...f, operator: e.target.value as Operator }
                          : f,
                      );
                      setFilters(newFilters);
                    }}
                  >
                    {operators.map((operator) => (
                      <option key={operator} value={operator}>
                        {operator}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={filter.value}
                    onChange={(e) => {
                      const newFilters = filters.map((f) =>
                        f.id === filter.id
                          ? { ...f, value: parseFloat(e.target.value) }
                          : f,
                      );
                      setFilters(newFilters);
                    }}
                  />
                  <Button onClick={() => toggleEnabled(filter.id)}>
                    {filter.disabled ? 'Enable' : 'Disable'}
                  </Button>
                  <Button onClick={() => removeFilter(filter.id)}>
                    <Delete />
                  </Button>
                </li>
              );
            }
            return (
              <Button key={filter.id} onClick={() => removeFilter(filter.id)}>
                Unknown field type
              </Button>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;
