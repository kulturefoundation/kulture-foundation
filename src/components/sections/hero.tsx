
'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const heroImages = [
    PlaceHolderImages.find((p) => p.id === 'carousel-hero-1'),
    PlaceHolderImages.find((p) => p.id === 'carousel-hero-2'),
    PlaceHolderImages.find((p) => p.id === 'carousel-hero-3'),
  ].filter(Boolean);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] flex items-center"
    >
      <Carousel
        plugins={[plugin.current]}
        className="absolute inset-0 w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {heroImages.map(
            (image, index) =>
              image && (
                <CarouselItem key={index}>
                  <div className="relative h-screen w-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      data-ai-hint={image.imageHint}
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              )
          )}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-primary/70"></div>

      <div className="container relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 text-shadow-lg">
          Our Culture Is Our Future.
          <br />
          <span className="text-accent">Let's Preserve It Together.</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            We don't just preserve culture; we empower its keepers. A grassroots movement building a new Ugandan legacy through storytelling, education, and art.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="bg-accent text-foreground hover:bg-accent/90"
          >
            <Link href="/donate">Join The Movement</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary"
            asChild
          >
            <Link href="/story-hub">Watch Our Story</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link href="#mission" aria-label="Scroll down">
          <div className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors animate-bounce">
            <ArrowDown className="h-6 w-6" />
          </div>
        </Link>
      </div>
    </section>
  );
};
 
