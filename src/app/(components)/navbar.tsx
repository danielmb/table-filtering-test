'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';
import React from 'react';

/**
 * Capitalize the first letter of a string
 */
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const Navbar: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();
  return (
    <div className="bg-gray-200 text-white px-6 py-0 dark:bg-gray-600">
      <div className="flex justify-between items-center  dark:bg-gray-900 bg-gray-800 px-5 py-4 ">
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="h-8 w-[100px]">
            <SelectValue
              placeholder={theme ? capitalize(theme) : undefined}
              className="capitalize"
            />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme} className="capitalize">
                {capitalize(theme)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Navbar;
