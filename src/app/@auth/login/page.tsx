import { SignIn } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
  return (
    <div>
      <SignIn routing="hash" />
    </div>
  );
};

export default Page;
