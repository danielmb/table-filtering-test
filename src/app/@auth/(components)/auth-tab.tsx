'use client';

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthLink({
  href,
  children,
  className = '',
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isActive = pathname === href;
  const redirectUrl = searchParams.get('redirectUrl');
  return (
    <Link
      {...props}
      href={{
        pathname: href,
        query: { redirectUrl },
      }}
      // className={`${className} ${
      //   isActive
      //     ? 'bg-secondary text-foreground'
      //     : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      // } px-3 py-2 rounded-md text-sm font-medium`}
      className={cn(
        isActive
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
        'px-3 py-2 rounded-md text-sm font-medium',
        className,
      )}
    >
      {children}
    </Link>
  );
}
