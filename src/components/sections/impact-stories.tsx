
'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ImpactStories = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  const stories = [
    {
      beforeImageId: 'child-samuel',
      afterImageId: 'gallery-education-1',
      name: 'Amina N.',
      age: 14,
      story:
        "Forced to drop out, Amina's dream of becoming a teacher was fading. A Kulture Foundation scholarship put her back in the classroom. Now, she's not just learning; she's leading.",
      link: '/story-hub/from-dropout-to-dreams-aminas-story',
    },
    {
      beforeImageId: 'gallery-arts-2',
      afterImageId: 'event-showcase',
      name: 'Rebecca K.',
      age: 28,
      story:
        'A talented painter with no platform, Rebecca struggled to sell her work. After being featured in our Artist Spotlight, she sold 5 paintings and now supports her family with her art.',
      link: '/story-hub/the-sound-of-opportunity-rebeccas-story',
    },
    {
      beforeImageId: 'gallery-culture-1',
      afterImageId: 'story-village',
      name: 'Sarah K.',
      age: 68,
      story:
        "The stories of Sarah's village were being lost. We documented her oral histories, preserving priceless cultural knowledge for future generations to hear in her own voice.",
      link: null, // No page exists yet
    },
  ];

  return (
    <section
      style={{ backgroundColor: '#064E3B' }}
      className="py-24 sm:py-32 text-white"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-accent">
            Stories That Change Lives
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Go beyond the numbers. These are the real, human stories of
            transformation powered by your support.
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {stories.map((story, index) => {
              const beforeImage = PlaceHolderImages.find(
                (p) => p.id === story.beforeImageId
              );
              const afterImage = PlaceHolderImages.find(
                (p) => p.id === story.afterImageId
              );
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-white/5 border-white/10 rounded-lg overflow-hidden h-full flex flex-col">
                      <div className="grid grid-cols-2">
                        {beforeImage && (
                          <Image
                            src={beforeImage.imageUrl}
                            alt="Before"
                            width={300}
                            height={300}
                            className="object-cover aspect-square"
                          />
                        )}
                        {afterImage && (
                          <Image
                            src={afterImage.imageUrl}
                            alt="After"
                            width={300}
                            height={300}
                            className="object-cover aspect-square"
                          />
                        )}
                      </div>
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <h3 className="text-2xl font-bold text-accent">
                          {story.name}, {story.age}
                        </h3>
                        <p className="text-gray-300 mt-2 mb-4 flex-grow">
                          {story.story}
                        </p>
                        {story.link ? (
                          <Button
                            variant="link"
                            asChild
                            className="p-0 text-accent h-auto justify-start"
                          >
                            <Link href={story.link}>Read Full Story &rarr;</Link>
                          </Button>
                        ) : (
                          <span className="text-accent/50 text-sm">Full story coming soon</span>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 md:-left-12 bg-white/10 border-white/20 text-white hover:bg-white/20" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 md:-right-12 bg-white/10 border-white/20 text-white hover:bg-white/20" />
        </Carousel>
         <div className="text-center mt-12">
            <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-primary-foreground">
                <Link href="/story-hub">Read More Impact Stories</Link>
            </Button>
        </div>
      </div>
    </section>
  );
};
 
