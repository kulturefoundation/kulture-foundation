
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export const MissionStatement = () => {
  const founderImage = PlaceHolderImages.find((p) => p.id === 'testimonial-david');

  return (
    <section id="mission" className="py-24 sm:py-32">
      <div className="container text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          From <span className="text-accent">Struggle</span> to School. From{' '}
          <span className="text-accent">Silence</span> to Stage. From{' '}
          <span className="text-accent">Poverty</span> to Pride.
        </h2>
        <div className="mt-12 flex justify-center">
          {founderImage && (
            <Image
              src={founderImage.imageUrl}
              alt="Ssebunya Edgar, Founder"
              width={100}
              height={100}
              className="rounded-full border-4 border-accent"
            />
          )}
        </div>
        <blockquote className="mt-6 text-xl text-foreground/80 italic max-w-2xl mx-auto">
          "We don't give handouts; we create sustainable pathways. We don't exploit stories for funding; we honor them. We don't work FOR communities; we work WITH them. This is impact rooted in dignity."
        </blockquote>
        <p className="mt-2 font-bold text-primary">
          - Ssebunya Edgar, Founder
        </p>
      </div>
    </section>
  );
};
 
