'use client';

import React from 'react';
import { setRandomSalary } from '../server';
import { Button } from '@/components/ui/button';

interface SetRandomSalaryButtonProps {
  id: string;
}
const SetRandomSalaryButton: React.FC<SetRandomSalaryButtonProps> = ({
  id,
}) => {
  const handleClick = async () => {
    await setRandomSalary(id);
  };
  return <Button onClick={handleClick}>Set Random Salary</Button>;
};

export default SetRandomSalaryButton;
