import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import DonationModal from './DonationModal';

const DonationPrompt: React.FC = () => {
  const t = useTranslations('common');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-primary/10 p-4 rounded-lg shadow-sm animate-fadeIn transition-all duration-300 ease-in-out hover:bg-primary/20">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{t('donationPrompt')}</p>
        <Button size="sm" variant="outline" className="ml-4" onClick={() => setIsModalOpen(true)}>
          <Heart className="mr-2 h-4 w-4" />
          {t('donate')}
        </Button>
      </div>
      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DonationPrompt;