'use client';
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
const ModalRouteWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      defaultOpen
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          router.back();
        }
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalRouteWrapper;
