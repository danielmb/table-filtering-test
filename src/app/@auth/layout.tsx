import React from 'react';
import ModalRouteWrapper from '@/components/modal-route';
import { DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { AuthLink } from './(components)/auth-tab';
import { UserButton } from '@clerk/nextjs';

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <ModalRouteWrapper>
      <VisuallyHidden>
        <DialogTitle>Login/register</DialogTitle>
      </VisuallyHidden>
      <div className="flex flex-row w-full">
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
    </ModalRouteWrapper>
  );
};

export default AuthLayout;
