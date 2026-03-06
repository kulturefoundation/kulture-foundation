
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  BookOpen,
  GraduationCap,
  Users,
  Download,
} from 'lucide-react';
import Link from 'next/link';

const donationImpacts = [
  {
    icon: Heart,
    amount: '$1',
    description: 'Provides a nutritious meal for a child.',
  },
  {
    icon: BookOpen,
    amount: '$10',
    description: 'Buys a full set of school supplies.',
  },
  {
    icon: GraduationCap,
    amount: '$50',
    description: 'Covers school fees for one term.',
  },
  {
    icon: Users,
    amount: '$200',
    description: 'Sponsors a student for a full year.',
  },
];

const trustBadges = [
  'Community-Driven',
  '100% Accountability',
  'No Hidden Fees',
];

export const TransparencySection = () => {
  return (
    <section className="py-24 sm:py-32 bg-white border-t-4 border-accent">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Transparent{' '}
            <span className="text-accent">by Design</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We believe you have the right to know exactly where your support
            goes. Every shilling is tracked and accounted for.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {donationImpacts.map((item, index) => (
              <Card key={index} className="bg-secondary/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">
                      {item.amount}
                    </p>
                    <p className="text-muted-foreground font-medium">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Where Your Donation Goes
                </CardTitle>
                <CardDescription>
                  We maximize impact by minimizing overhead.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1 font-semibold">
                    <span>Direct Program Costs</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-4">
                    <div
                      className="bg-primary h-4 rounded-full"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    School fees, artist grants, food, materials, etc.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between mb-1 font-semibold">
                    <span>Operational & Admin</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-4">
                    <div
                      className="bg-accent h-4 rounded-full"
                      style={{ width: '15%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Web hosting, transaction fees, transport.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                  {trustBadges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="border-primary/50 text-primary"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/transparency/2025">
                    <Download className="mr-2 h-4 w-4" />
                    Read Our 2025 Impact Report
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
 
