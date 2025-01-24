import { SignIn } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <SignIn routing="hash" />
    </div>
  );
};

export default Page;
