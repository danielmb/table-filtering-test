import React from 'react';
import { OrganizationSwitcher, SignedIn, UserProfile } from '@clerk/nextjs';
const ProfilePage: React.FC = async () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      {/* {user.orgPermissions} */}
      <SignedIn>
        <OrganizationSwitcher />
        <UserProfile routing="hash" />
      </SignedIn>
    </div>
  );
};

export default ProfilePage;
