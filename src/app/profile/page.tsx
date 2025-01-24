import React from 'react';
import { OrganizationSwitcher } from '@clerk/nextjs';
const ProfilePage: React.FC = async () => {
  return (
    <div>
      {/* {user.orgPermissions} */}
      <OrganizationSwitcher />
    </div>
  );
};

export default ProfilePage;
