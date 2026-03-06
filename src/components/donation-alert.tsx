
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Card } from './ui/card';

type Donation = {
  name: string;
  location: string;
  flag: string;
  amount: string;
};

const fakeDonations: Donation[] = [
    { name: 'Edgar S.', location: 'Kampala', flag: '🇺🇬', amount: 'UGX 50,000' },
    { name: 'Sarah J.', location: 'London', flag: '🇬🇧', amount: '$25' },
    { name: 'David O.', location: 'Nairobi', flag: '🇰🇪', amount: 'UGX 75,000' },
    { name: 'Maria K.', location: 'New York', flag: '🇺🇸', amount: '$50' },
    { name: 'John M.', location: 'Wakiso', flag: '🇺🇬', amount: 'UGX 20,000' },
];

export function DonationAlert() {
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const showRandomDonation = () => {
      const randomIndex = Math.floor(Math.random() * fakeDonations.length);
      setCurrentDonation(fakeDonations[randomIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Visible for 5 seconds
    };
    
    // Start the first alert after an initial delay
    const initialTimeout = setTimeout(showRandomDonation, 8000);

    // Set an interval to show subsequent alerts
    const interval = setInterval(showRandomDonation, 15000); // Show a new alert every 15 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!currentDonation) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-6 z-50 transition-all duration-500 ease-in-out',
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      )}
    >
      <Card className="flex items-center gap-4 p-4 shadow-2xl">
        <div className="bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6" />
        </div>
        <div>
            <p className="font-bold text-sm text-foreground">
                {currentDonation.name} just donated {currentDonation.amount}!
            </p>
            <p className="text-xs text-muted-foreground">
                from {currentDonation.location} {currentDonation.flag}
            </p>
        </div>
      </Card>
    </div>
  );
}
 
