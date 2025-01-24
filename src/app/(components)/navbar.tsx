import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  getMobileMenuState,
  toggleMobileMenu,
} from '../(actions)/menu-actions';
import { MobileMenuToggle } from './navbar-mobile-menu-toggle';
import ThemeSelect from './theme-select';
import { NavLink } from './navlink';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
interface Page {
  title: string;
  href: string;
}
const pages = [
  { title: 'Home', href: '/' },
  { title: 'Users', href: '/users' },
] satisfies Page[];

const Navbar = async () => {
  const isMobileMenuOpen = await getMobileMenuState();

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 text-xl font-bold text-foreground"
            >
              Next.js Table Demo
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {pages.map((page) => (
                  <NavLink
                    key={page.href}
                    href={page.href}
                    className="text-muted-foreground hover:bg-secondary hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {page.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-background text-foreground">
            <ThemeSelect />
            <SignedOut>
              <Link href="/login">
                <Button variant="default" className="">
                  Login
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <SignOutButton />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <MobileMenuToggle
              isOpen={isMobileMenuOpen ?? false}
              toggleMenu={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* <Link
              href="/"
              className="text-muted-foreground hover:bg-secondary hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:bg-secondary hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-muted-foreground hover:bg-secondary hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:bg-secondary hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link> */}
            {pages.map((page) => (
              <NavLink
                key={page.href}
                href={page.href}
                className="text-muted-foreground hover:bg-secondary hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
              >
                {page.title}
              </NavLink>
            ))}

            <Button variant="default" className="w-full mt-2">
              Login
            </Button>
            <div className="mt-2">
              <ThemeSelect />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
