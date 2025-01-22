import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { ColumnDef, Row } from '@tanstack/react-table';

interface SelectColumnProps {
  id?: string;
}
export function createSelectColumn<T>({
  id = 'select',
}: SelectColumnProps = {}): ColumnDef<T> {
  let lastSelectedId = '';

  return {
    id,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
            ? 'indeterminate'
            : false
        }
        // onChange={table.getToggleAllRowsSelectedHandler()}
        onCheckedChange={(checked) => {
          table.toggleAllRowsSelected(checked ? true : false);
        }}
      />
    ),
    cell: ({ row, table }) => (
      <Checkbox
        id={`select-row-${row.id}`}
        checked={row.getIsSelected()}
        // onChange={row.getToggleSelectedHandler()}
        onCheckedChange={(checked) => {
          row.toggleSelected(checked ? true : false);
        }}
        onClick={(e) => {
          if (e.shiftKey) {
            const { rows, rowsById } = table.getRowModel();
            const rowsToToggle = getRowRange(rows, row.id, lastSelectedId);
            const isLastSelected = rowsById[lastSelectedId].getIsSelected();
            rowsToToggle.forEach((row) => row.toggleSelected(isLastSelected));
          }

          lastSelectedId = row.id;
        }}
      />
    ),
    maxSize: 50,
  };
}
function getRowRange<T>(rows: Array<Row<T>>, idA: string, idB: string) {
  const range: Array<Row<T>> = [];
  let foundStart = false;
  let foundEnd = false;
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    if (row.id === idA || row.id === idB) {
      if (foundStart) {
        foundEnd = true;
      }
      if (!foundStart) {
        foundStart = true;
      }
    }
    if (foundStart) {
      range.push(row);
    }
    if (foundEnd) {
      break;
    }
  }
  // added this check
  if (!foundEnd) {
    throw Error('Could not find whole row range');
  }
  return range;
}
