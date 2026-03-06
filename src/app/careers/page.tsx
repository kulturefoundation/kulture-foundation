
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Kulture Foundation',
  description: 'Join our team and help make a difference. View current job openings and career opportunities at Kulture Foundation.',
  openGraph: {
    title: 'Careers | Kulture Foundation',
    description: 'Interested in joining our team? Check here for opportunities to contribute your skills to our mission.',
  },
};

export default function CareersPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Briefcase className="w-4 h-4" />
                <span>Join Our Team</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Careers at Kulture Foundation
              </h1>
              <p className="text-lg text-muted-foreground mb-12">
                We are always looking for passionate, talented individuals to join our mission. While we do not have any open positions at the moment, we encourage you to check back regularly.
              </p>
              
              <div className="bg-secondary p-8 rounded-lg border">
                <h2 className="text-2xl font-bold text-foreground">No Open Positions Currently</h2>
                <p className="mt-2 text-muted-foreground">
                  Thank you for your interest in working with Kulture Foundation. Please follow our social media channels for announcements on future openings.
                </p>
              </div>

              <div className="mt-12">
                <Button asChild>
                    <Link href="/volunteer">
                        Consider Volunteering
                    </Link>
                </Button>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
 
