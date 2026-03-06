
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter, FirestorePermissionError } from "@/lib/errors";

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const popupImage = PlaceHolderImages.find(p => p.id === 'story-market');
  const firestore = useFirestore();

  useEffect(() => {
    // Use sessionStorage to ensure the popup appears only once per session.
    const newsletterDismissedInSession = sessionStorage.getItem("kulture_newsletter_dismissed");
    if (newsletterDismissedInSession) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000); // 30 seconds

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight / 2) {
        if (!sessionStorage.getItem("kulture_newsletter_dismissed")) {
            setIsOpen(true);
        }
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleClose = () => {
    // Set a flag in sessionStorage when the popup is dismissed.
    sessionStorage.setItem("kulture_newsletter_dismissed", "true");
    setIsOpen(false);
  }

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
          description: "Thank you for joining our newsletter. Look out for updates from us soon."
      });
      
      setEmail("");
      handleClose();

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Subscription Failed",
            description: error.message || "Could not subscribe. Please try again."
        })
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {popupImage && (
            <div className="relative h-48 w-full">
                <Image src={popupImage.imageUrl} alt={popupImage.description} fill data-ai-hint={popupImage.imageHint} className="object-cover" />
            </div>
        )}
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">Join Our Community</DialogTitle>
          <DialogDescription>
            Get the latest stories, program updates, and impact reports delivered straight to your inbox.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="px-6">
                <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
            </div>
            <DialogFooter className="p-6 pt-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                     {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4"/>}
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
 
