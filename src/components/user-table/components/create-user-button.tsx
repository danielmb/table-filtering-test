'use client';

import { createUser } from '../server';
const CreateUserButton = () => {
  const handleClick = async () => {
    await createUser();
  };

  return <button onClick={handleClick}>Create User</button>;
};

export default CreateUserButton;
