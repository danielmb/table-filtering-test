export type Operator =
  | 'contains'
  | '>'
  | '<'
  | '>='
  | '<='
  | 'is'
  | 'startsWith'
  | 'endsWith'
  | 'not';
export interface Filter {
  field: string;
  operator: Operator;
  value: unknown;
  disabled?: boolean;
}
export type FieldType = 'string' | 'number' | 'boolean' | 'date';

// export type FieldSchema = {
//   [field: string]: {
//     type: FieldType;
//     allowedOperators?: Operator[]; // will default to all operators
//   };
// };
type SchemaField = {
  type: FieldType;
  allowedOperators?: Operator[];
  notNullable?: boolean;
  label?: string;
};
export type FieldSchema = Record<string, SchemaField>;
const getValue = (value: unknown, schemaField?: SchemaField) => {
  if (!schemaField) {
    return value;
  }
  if (schemaField.notNullable && value == null) {
    throw new Error('Value cannot be null');
  }
  if (value == null) {
    return null;
  }
  const type = schemaField.type;
  switch (type) {
    case 'string':
      return value as string;
    case 'number':
      return Number(value);
    case 'boolean':
      return Boolean(value);
    case 'date':
      return new Date(value as string);
    default:
      return value;
  }
};
export const filterToPrisma = (filter: Filter, schema?: FieldSchema) => {
  // const value = filter.value;
  const value = getValue(filter.value, schema?.[filter.field]);
  const field = filter.field;
  switch (filter.operator) {
    case 'contains':
      return {
        [field]: {
          contains: value,
        },
      };
    case '>':
      return {
        [field]: {
          gt: value,
        },
      };
    case '<':
      return {
        [field]: {
          lt: value,
        },
      };
    case '>=':
      return {
        [field]: {
          gte: value,
        },
      };
    case '<=':
      return {
        [field]: {
          lte: value,
        },
      };
    case 'is':
      return {
        [field]: value,
      };

    case 'startsWith':
      return {
        [field]: {
          startsWith: value,
        },
      };
    case 'endsWith':
      return {
        [field]: {
          endsWith: value,
        },
      };
    case 'not':
      return {
        NOT: {
          [field]: value,
        },
      };

    default:
      return {};
  }
};
export const filtersToPrisma = (filters: Filter[], schema?: FieldSchema) => {
  // prisma supports and, or. but we will use and for simplicity...

  return filters.map((filter) => filterToPrisma(filter, schema));
};

// interface FieldSchema {
//   type: 'string' | 'number' | 'boolean' | 'date';
//   allowedOperators: Operator[];
// }

export const stringOperators = [
  'contains',
  'is',
  'startsWith',
  'endsWith',
  'not',
] as const satisfies Operator[];
export const numberOperators = [
  '>',
  '<',
  '>=',
  '<=',
  'is',
  'not',
] as const satisfies Operator[];
export const booleanOperators = ['is'] as const satisfies Operator[];
export const dateOperators = [
  '>',
  '<',
  '>=',
  '<=',
  'is',
  'not',
] as const satisfies Operator[];

export const defaultOperatorMap = {
  string: stringOperators,
  number: numberOperators,
  boolean: booleanOperators,
  date: dateOperators,
} as const satisfies Record<FieldType, Operator[]>;
export const getDefaultOperators = (type: string): Operator[] => {
  // switch (type) {
  //   case 'string':
  //     return stringOperators;
  //   case 'number':
  //     return numberOperators;
  //   case 'boolean':
  //     return booleanOperators;
  //   case 'date':
  //     return dateOperators;
  //   default:
  //     return [];
  // }
  return defaultOperatorMap[type as FieldType];
};

export const validateFilters = (filters: Filter[], schema: FieldSchema) => {
  // return filters.every((filter) => {
  //   // check if its in the schema
  //   const fieldSchema = schema[filter.field];
  //   if (!fieldSchema) {
  //     return false;
  //   }

  //   return fieldSchema.allowedOperators.includes(filter.operator);
  // });
  for (const filter of filters) {
    const fieldSchema = schema[filter.field];
    if (!fieldSchema) {
      throw new Error(`Field ${filter.field} not found in schema`);
    }
    const allowedOperators =
      fieldSchema.allowedOperators || getDefaultOperators(fieldSchema.type);
    if (!allowedOperators.includes(filter.operator)) {
      throw new Error(
        `Operator ${filter.operator} not allowed for field ${filter.field}`,
      );
    }

    if (
      typeof filter.value !== fieldSchema.type &&
      // only for number, boolean, string
      fieldSchema.type !== 'date' &&
      // if value is null, and field is not nullable

      (filter.value !== null || fieldSchema.notNullable)
    ) {
      throw new Error(
        `Value ${filter.value} is not of type ${fieldSchema.type}`,
      );
    }

    const dissallowedNullOperators = ['>', '<', '>=', '<=', 'contains'];
    if (
      filter.value == null &&
      dissallowedNullOperators.includes(filter.operator)
    ) {
      throw new Error(
        `Operator ${filter.operator} does not allow null value for field ${filter.field}`,
      );
    }
  }
};
