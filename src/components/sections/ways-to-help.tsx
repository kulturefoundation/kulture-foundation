
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, HandHeart, Users } from 'lucide-react';

const waysToHelp = [
  {
    icon: Heart,
    title: 'Donate',
    description:
      'Make a one-time or monthly donation to directly fund our programs and create immediate impact.',
    cta: 'Donate Now',
    href: '/donate',
    variant: 'gold' as const,
  },
  {
    icon: HandHeart,
    title: 'Sponsor a Child',
    description:
      'Create a personal connection and transform the life of a child through educational sponsorship.',
    cta: 'Sponsor a Child',
    href: '/sponsorship',
    variant: 'green' as const,
  },
  {
    icon: Users,
    title: 'Volunteer',
    description:
      'Lend your skills as a photographer, storyteller, or field assistant. Join us on the ground.',
    cta: 'Volunteer With Us',
    href: '/volunteer',
    variant: 'gold' as const,
  },
];

export const WaysToHelp = () => {
  return (
    <section className="py-24 sm:py-32 bg-green-50 dark:bg-green-950/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Multiple Ways to Make a Difference
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you give time, resources, or support, your contribution is vital. Find the path that fits you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {waysToHelp.map((item) => (
            <Card
              key={item.title}
              className={`flex flex-col text-center border-2 ${
                item.variant === 'gold' ? 'border-accent' : 'border-primary'
              } bg-card`}
            >
              <CardHeader className="items-center">
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center ${
                    item.variant === 'gold'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <item.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl pt-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-muted-foreground flex-1 mb-8">
                  {item.description}
                </p>
                <Button
                  asChild
                  size="lg"
                  className={
                    item.variant === 'gold'
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }
                >
                  <Link href={item.href}>{item.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
 
