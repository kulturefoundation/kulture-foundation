
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { errorEmitter, FirestorePermissionError } from "@/lib/errors";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.52.02C13.84 0 15.14.01 16.44 0a5 5 0 0 1 5 5v2M19.04 11A8 8 0 1 1 11 3.04v5.37a2.63 2.63 0 1 0-2.63 2.63h5.25Z"></path>
    </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/kulturefoundationuganda", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/kulturefoundation", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/KultureFoundUG", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@kulturefoundationuganda", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/kulture-foundation/", label: "LinkedIn" },
  { icon: TikTokIcon, href: "https://tiktok.com/@kulturefoundation", label: "TikTok" },
];

export default function Footer() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logoImage = PlaceHolderImages.find((p) => p.id === 'kulture-foundation-logo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firestore) return;

    setIsSubmitting(true);
    
    try {
      const subscribersCollection = collection(firestore, 'subscribers');
      const newSubscriber = {
        email: email,
        subscribedAt: serverTimestamp(),
      };

      addDoc(subscribersCollection, newSubscriber)
        .catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: subscribersCollection.path,
                operation: 'create',
                requestResourceData: newSubscriber,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

      toast({
        title: "Subscribed!",
        description: "Thank you for joining our newsletter."
      });
      setEmail("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Subscription Failed",
        description: error.message || "Could not subscribe. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer style={{backgroundColor: '#064E3B'}} className="text-white">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-12">
          
          <div className="md:col-span-6 lg:col-span-3 text-center md:text-left">
            <Link href="/" className="inline-block mb-4">
                {logoImage ? (
                  <div className="relative w-28 h-28 p-2 bg-white/10 rounded-full ring-2 ring-accent/80 mx-auto">
                    <Image
                      src={logoImage.imageUrl}
                      alt="256 Estates Foundation Logo"
                      width={112}
                      height={112}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <Logo className="h-16 w-16 text-accent" />
                )}
            </Link>
            <p className="text-xl font-semibold text-white">256 ESTATES FOUNDATION</p>
            <p className="text-sm font-bold tracking-wider text-accent mt-1">Preserving Heritage, Empowering Futures.</p>
          </div>
          
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-accent transition-colors">Programs</Link></li>
              <li><Link href="/story-hub" className="hover:text-accent transition-colors">Stories</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase">Get Involved</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/donate" className="hover:text-accent transition-colors">Donate Now</Link></li>
              <li><Link href="/volunteer" className="hover:text-accent transition-colors">Volunteer</Link></li>
              <li><Link href="/sponsorship" className="hover:text-accent transition-colors">Sponsor a Child</Link></li>
              <li><Link href="/#contact" className="hover:text-accent transition-colors">Partner With Us</Link></li>
            </ul>
          </div>

           <div className="md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/mediakit" className="hover:text-accent transition-colors">Media Kit</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/transparency/2025" className="hover:text-accent transition-colors">Reports</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-semibold text-white mb-4 tracking-wider uppercase">Join Our Newsletter</h4>
             <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button type="submit" disabled={isSubmitting} style={{backgroundColor: '#F59E0B', color: '#064E3B'}}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-2">Get impact updates and stories directly from the field.</p>
            
            <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                    <Button key={social.label} variant="outline" size="icon" className="h-10 w-10 bg-transparent border-accent text-accent hover:bg-accent hover:text-primary" asChild>
                        <Link href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                            <social.icon className="h-5 w-5" />
                        </Link>
                    </Button>
                ))}
            </div>
          </div>
        </div>
        
        <div className="mt-20 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="text-center md:text-left">Registered CBO | Kampala, Uganda</p>
          <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} 256 Estates Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
