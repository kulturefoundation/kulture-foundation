
'use client';
import { programs } from '@/lib/programs-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const ProgramsGrid = () => {
  return (
    <section id="programs" className="py-24 sm:py-32 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Our Four Pillars of Impact
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our work is focused on four interconnected areas to create holistic
            and sustainable change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="flex flex-col rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card"
            >
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-primary/10 text-primary p-4 rounded-lg self-start">
                    <program.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary leading-tight">
                      {program.title}
                    </h3>
                  </div>
                </div>
                <p className="text-accent font-semibold italic mb-4">
                  {program.tagline}
                </p>
                <p className="text-muted-foreground mb-6 flex-1">
                  {program.shortDescription}
                </p>
                <Button
                  variant="secondary"
                  asChild
                  className="self-start group"
                >
                  <Link href={program.href}>
                    {program.ctaText}{' '}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
 
