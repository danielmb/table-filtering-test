'use client';

import React from 'react';
import { setRandomSalary } from '../server';

interface SetRandomSalaryButtonProps {
  id: string;
}
const SetRandomSalaryButton: React.FC<SetRandomSalaryButtonProps> = ({
  id,
}) => {
  const handleClick = async () => {
    await setRandomSalary(id);
  };
  return <button onClick={handleClick}>Set Random Salary</button>;
};

export default SetRandomSalaryButton;
