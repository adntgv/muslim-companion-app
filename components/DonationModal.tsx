import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ExternalLink } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('donation');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>{t('modalTitle')}</DialogTitle>
          <DialogDescription>{t('modalDescription')}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h3 className="font-semibold mb-2">{t('donationMethods')}</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t('kaspi')}: +7 777 571 75 57</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>{t('close')}</Button>
          {/* <Button onClick={() => window.open('https://example.com/donate', '_blank')} className="ml-2">
            {t('donateNow')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;