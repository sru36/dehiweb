import React from 'react';
import { Button } from '@/components/ui/button';
import { useDonationModal } from '@/components/DonationModal';
import { isAuthenticated } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

export default function BannerDonate({ onClick, title }: { onClick?: () => void; title?: string }) {
  const { open } = useDonationModal();
  const navigate = useNavigate();
  const handle = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    onClick?.();
    open({ id: title, title, source: 'banner' });
  };
  return (
    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-lg" onClick={handle}>
      Donate now
    </Button>
  );
}
