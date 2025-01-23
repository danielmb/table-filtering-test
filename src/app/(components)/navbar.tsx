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
const themify = (str: string) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace('-', ' ');
};
const Navbar: React.FC = () => {
  const { theme, setTheme, themes } = useTheme();
  return (
    <div className="px-6 py-0 ">
      <div className="flex justify-between items-center  px-5 py-4 ">
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="h-8 w-[100px]">
            <SelectValue
              placeholder={theme ? themify(theme) : undefined}
              className="capitalize"
            />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme} className="capitalize">
                {themify(theme)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Navbar;
