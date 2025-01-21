import { Operator } from '@/lib/filters';

export interface FilterFieldProps {
  id: string;
  field: string;
  value?: string | number | null;
  operator?: Operator;
  disabled?: boolean;
}
