
'use client';

import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Lucide doesn't have a WhatsApp icon, so we use a simple SVG
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


export function SocialShare({ title, slug, type }: { title: string, slug: string, type: 'blog' | 'story-hub' }) {
    const pathname = usePathname();
    const isClient = typeof window !== 'undefined';
    const url = isClient ? `${window.location.origin}${pathname}` : `https://kulturefoundation.org/${type}/${slug}`;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    };

    const SharePopoverContent = () => (
      <div className="flex items-center gap-2">
        <Button asChild size="icon" variant="outline">
          <Link href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook className="h-5 w-5"/></Link>
        </Button>
        <Button asChild size="icon" variant="outline">
          <Link href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"><Twitter className="h-5 w-5"/></Link>
        </Button>
        <Button asChild size="icon" variant="outline">
          <Link href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><WhatsAppIcon className="h-5 w-5"/></Link>
        </Button>
        <Button asChild size="icon" variant="outline">
          <Link href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin className="h-5 w-5"/></Link>
        </Button>
      </div>
    );

    return (
        <>
            {/* Mobile Floating Button */}
            <div className="lg:hidden fixed bottom-6 left-6 z-40">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            <Share2 className="h-6 w-6" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2" side="top" align="start">
                        <SharePopoverContent />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Desktop Sticky Sidebar */}
             <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-32">
                <div className="sticky top-1/2 flex flex-col items-center gap-3 p-2 rounded-lg bg-secondary/80 border">
                    <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Share</p>
                    <Button asChild size="icon" variant="ghost">
                        <Link href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook className="h-5 w-5"/></Link>
                    </Button>
                    <Button asChild size="icon" variant="ghost">
                        <Link href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"><Twitter className="h-5 w-5"/></Link>
                    </Button>
                    <Button asChild size="icon" variant="ghost">
                        <Link href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><WhatsAppIcon className="h-5 w-5"/></Link>
                    </Button>
                    <Button asChild size="icon" variant="ghost">
                        <Link href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin className="h-5 w-5"/></Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

