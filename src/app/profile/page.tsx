import React from 'react';
import { SignedIn, UserProfile } from '@clerk/nextjs';
const ProfilePage: React.FC = async () => {
  return (
    <div>
      {/* {user.orgPermissions} */}
      <SignedIn>
        {/* <OrganizationSwitcher /> */}
        <UserProfile routing="hash" />
      </SignedIn>
    </div>
  );
};

export default ProfilePage;
