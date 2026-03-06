
'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const FounderStory = () => {
  const founderImage = PlaceHolderImages.find((p) => p.id === 'testimonial-david');

  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {founderImage && (
              <Image
                src={founderImage.imageUrl}
                alt="Ssebunya Edgar in the community"
                width={600}
                height={700}
                className="rounded-lg shadow-xl object-cover aspect-[4/5]"
              />
            )}
          </div>
          <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg">
            <h2 className="text-4xl font-extrabold text-accent mb-4">
              Meet Ssebunya Edgar
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                To understand Kulture Foundation, you must first understand the journey of its founder. For years, Ssebunya Edgar built brands—the pioneering <strong>256 Hiphop Awards</strong>, the online <strong>Kulture Radio</strong>, and a community of over 200,000 followers. But success felt hollow.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 py-2 my-4 text-xl font-semibold italic">
                "My ancestors had to bring me back to the foundation. My brands went silent because my spirit was being called to build a legacy, not just a business. Kulture Foundation is that calling."
              </blockquote>
              <p>
                This isn't an NGO created from a boardroom. It was forged in the fire of personal sacrifice and spiritual guidance. With a unique blend of street-level hustle, strategic vision, and a deep-seated love for his culture, Ssebunya Edgar is not just running an NGO; he is answering a sacred call.
              </p>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-accent text-accent hover:bg-accent hover:text-primary-foreground"
              >
                <Link href="/about">Read The Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
 
