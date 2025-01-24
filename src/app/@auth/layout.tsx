import React from 'react';
import ModalRouteWrapper from '@/components/modal-route';
import { DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { AuthLink } from './(components)/auth-tab';

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <ModalRouteWrapper>
      <VisuallyHidden>
        <DialogTitle>Login/register</DialogTitle>
      </VisuallyHidden>

      <div className="flex flex-col w-full p-4 space-y-4  rounded-lg shadow-lg ">
        <div className="flex flex-row w-full ">
          <AuthLink
            href="/login"
            replace
            className="rounded-r-none w-full justify-start text-start border border-r-0
          transition-all duration-200 ease-in-out
          "
          >
            Login
          </AuthLink>
          <AuthLink
            href="/register"
            replace
            className="rounded-l-none w-full justify-end text-end border border-l-0
          transition-all duration-200 ease-in-out"
          >
            Register
          </AuthLink>
        </div>
        {children}
      </div>
    </ModalRouteWrapper>
  );
};

export default AuthLayout;
