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

const themify = (str: string) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace('-', ' ');
};

const ThemeSelect: React.FC = () => {
  const { theme, setTheme, themes, systemTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="h-8 w-[100px]">
        <SelectValue
          placeholder={themify(theme ?? '')}
          className="capitalize"
        />
      </SelectTrigger>
      <SelectContent>
        {themes.map((themeOption) => (
          <SelectItem
            key={themeOption}
            value={themeOption}
            className="capitalize"
          >
            {themify(themeOption)}
            {themeOption === systemTheme && <span> (System)</span>}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ThemeSelect;
