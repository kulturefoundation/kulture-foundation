'use client';

import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BackToTopButton from '@/components/back-to-top';

import { Hero } from '@/components/sections/hero';
import { MissionStatement } from '@/components/sections/mission-statement';
import { ProgramsGrid } from '@/components/sections/programs-grid';
import { ImpactStories } from '@/components/sections/impact-stories';
import { TransparencySection } from '@/components/sections/transparency';
import { WaysToHelp } from '@/components/sections/ways-to-help';
import { FounderStory } from '@/components/sections/founder-story';
import { FinalCta } from '@/components/sections/final-cta';
import Partners from '@/components/sections/partners';
import LatestPosts from '@/components/sections/latest-posts';
import Contact from '@/components/sections/contact';
import Events from '@/components/sections/events';

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <Hero />
        <MissionStatement />
        <ProgramsGrid />
        <ImpactStories />
        <TransparencySection />
        <WaysToHelp />
        <Events />
        <LatestPosts />
        <FounderStory />
        <Contact />
        <Partners />
        <FinalCta />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
 
