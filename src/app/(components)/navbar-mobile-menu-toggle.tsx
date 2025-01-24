'use client';

import { useTransition } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuToggleProps {
  isOpen: boolean;
  toggleMenu: () => Promise<void>;
}

export function MobileMenuToggle({
  isOpen,
  toggleMenu,
}: MobileMenuToggleProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={() => startTransition(() => toggleMenu())}
      disabled={isPending}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  );
}
