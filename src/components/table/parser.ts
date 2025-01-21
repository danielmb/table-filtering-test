import { FieldSchema, Filter } from '@/lib/filters';
import { createParser } from 'nuqs/server';
import { FilterFieldProps } from './types';

export const parseFilters = (schema: FieldSchema) =>
  createParser<FilterFieldProps[]>({
    serialize: (val) => {
      const mapped = val
        .filter((f) => f.operator)
        .map((f) => {
          return {
            field: f.field,
            operator: f.operator!,
            value: f.value,
            disabled: f.disabled === true ? true : undefined,
          } satisfies Filter;
        });
      return JSON.stringify(mapped);
    },
    parse: (val) => {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) {
        return [];
      }
      const schemaFields = Object.keys(schema);
      // get field in schema

      return parsed
        .map((f) => {
          const schemaKey = schemaFields.find((key) => key === f.field);
          if (!schemaKey) {
            return null;
          }
          return {
            id: crypto.randomUUID(),
            field: f.field,
            operator: f.operator,
            value: f.value,
            schema: schemaKey,
            disabled: f.disabled,
          } satisfies FilterFieldProps;
        })
        .filter((f) => f !== null) as FilterFieldProps[];
    },
  });

export const parseFiltersAsFilter = (schema: FieldSchema) =>
  createParser<Filter[]>({
    serialize: (val) => {
      const mapped = val
        .filter((f) => f.operator)
        .map((f) => {
          return {
            field: f.field,
            operator: f.operator!,
            value: f.value,
            disabled: f.disabled === true ? true : undefined,
          } satisfies Filter;
        });
      return JSON.stringify(mapped);
    },
    parse: (val) => {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed)) {
        return [];
      }
      const schemaFields = Object.keys(schema);
      // get field in schema

      return parsed
        .map((f) => {
          const schemaKey = schemaFields.find((key) => key === f.field);
          if (!schemaKey) {
            return null;
          }
          return {
            field: f.field,
            operator: f.operator,
            value: f.value,
            disabled: f.disabled,
          } satisfies Filter;
        })
        .filter((f) => f !== null)
        .filter((f) => !f.disabled) as Filter[];
    },
  });
