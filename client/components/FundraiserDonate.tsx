import React from 'react';
import { Button } from '@/components/ui/button';
import { useDonationModal } from '@/components/DonationModal';
import { isAuthenticated } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

export default function FundraiserDonate({ onClick, title }: { onClick?: () => void; title?: string }) {
  const { open } = useDonationModal();
  const navigate = useNavigate();
  const handle = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    onClick?.();
    open({ id: title, title, source: 'fundraiser' });
  };
  return (
    <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 text-white" onClick={handle}>
      Donate
    </Button>
  );
}
