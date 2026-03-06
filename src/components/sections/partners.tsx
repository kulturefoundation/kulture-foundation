
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const partnershipTypes = [
  "Local businesses committed to community impact",
  "International NGOs aligned with our mission",
  "Corporate sponsors looking for authentic CSR opportunities",
  "Media houses amplifying marginalized voices",
];

const partnerIds = ["kulture-foundation-logo", "partner-1", "partner-2", "partner-3", "partner-flutterwave", "partner-coinbase", "partner-4", "partner-5", "partner-6", "partner-7"];
const partners = partnerIds.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);
const allPartners = [...partners, ...partners]; // Duplicate for seamless scrolling


export default function Partners() {
  return (
    <section id="partners" className="py-24 sm:py-32 bg-secondary">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Building Partnerships
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We believe in collaboration over competition. As we grow, 
            we're seeking partnerships with:
          </p>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-left">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 bg-accent/10 text-accent h-8 w-8 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-5 w-5" />
                </div>
                <span className="text-lg text-foreground">{type}</span>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-xl font-semibold text-foreground mb-6">
                If your organization shares our commitment to authentic, community-led change, let's talk.
            </p>
            <Button size="lg" asChild className="bg-accent text-white hover:bg-accent/90">
              <Link href="/#contact">Become a Partner</Link>
            </Button>
          </div>
        </div>

        <div className="w-full overflow-hidden mt-24">
            <div className="flex animate-[marquee_40s_linear_infinite]">
                {allPartners.map((partner, index) => (
                <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center h-16">
                    {partner && (
                    <Image
                        src={partner.imageUrl}
                        alt={partner.description}
                        width={150}
                        height={60}
                        data-ai-hint={partner.imageHint}
                        className="object-contain max-h-full w-auto"
                    />
                    )}
                </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
 
