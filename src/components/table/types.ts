import { FieldSchema, Operator } from '@/lib/filters';

export interface FilterFieldProps {
  id: string;
  schema: keyof FieldSchema;
  field: string;
  value?: string | number;
  operator?: Operator;
  disabled?: boolean;
}
