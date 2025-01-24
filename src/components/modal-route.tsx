'use client';
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
const ModalRouteWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <Dialog
      open={true}
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
