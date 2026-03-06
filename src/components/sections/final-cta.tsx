
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const FinalCta = () => {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'sponsorship-hero');

  return (
    <section className="relative py-32 sm:py-40">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Joyful Ugandan community"
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-primary/80"></div>
      <div className="relative container text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold text-shadow-lg">
         Real Stories. <span className="text-accent">Real People.</span> Real Change.
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg">
          Join a movement of changemakers supporting Ugandan communities with dignity and purpose. Your action today fuels our mission tomorrow.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            className="bg-accent text-foreground hover:bg-accent/90 animate-pulse text-lg h-14 px-10"
          >
            <Link href="/donate">Start Making Impact Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
 
