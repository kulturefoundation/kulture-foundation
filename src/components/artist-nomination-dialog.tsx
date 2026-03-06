
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter, FirestorePermissionError } from "@/lib/errors";
import type { Event } from "@/lib/events-data";

const formSchema = z.object({
  nominatorName: z.string().min(2, "Please enter your name."),
  nominatorEmail: z.string().email("Please provide a valid email address."),
  artistName: z.string().min(2, "Please enter the artist's name."),
  artistContact: z.string().optional(),
  nominationReason: z.string().min(20, "Please provide a reason (min. 20 characters)."),
});

interface ArtistNominationDialogProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArtistNominationDialog({ event, isOpen, onClose }: ArtistNominationDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nominatorName: "",
      nominatorEmail: "",
      artistName: "",
      artistContact: "",
      nominationReason: "",
    },
  });
  
  useEffect(() => {
    if (user && isOpen) {
        form.setValue('nominatorName', user.displayName || '');
        form.setValue('nominatorEmail', user.email || '');
    } else if (!isOpen) {
        form.reset();
    }
  }, [user, form, isOpen]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database Not Available",
            description: "Could not process nomination. Please try again later.",
        });
        setIsSubmitting(false);
        return;
    }

    try {
        const nominationsCollection = collection(firestore, 'artist_nominations');
        const newNomination = {
            eventTitle: event?.title,
            ...values,
            nominatorId: user?.uid || null,
            submittedAt: serverTimestamp()
        };

        addDoc(nominationsCollection, newNomination).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: nominationsCollection.path,
                operation: 'create',
                requestResourceData: newNomination,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

        toast({
            title: "Nomination Submitted!",
            description: `Thank you for nominating ${values.artistName}. We will review the submission.`,
        });
        form.reset();
        onClose();

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: error.message || "An unexpected error occurred. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nominate an Artist for {event.title}</DialogTitle>
          <DialogDescription>
            Know a talented artist who deserves a platform? Fill out the form below to nominate them.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField control={form.control} name="artistName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nominated Artist's Name</FormLabel>
                        <FormControl><Input {...field} placeholder="e.g., John Kalyesubula" disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="nominationReason" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Why are you nominating this artist?</FormLabel>
                        <FormControl><Textarea {...field} placeholder="Tell us about their art, their story, and why they deserve this opportunity." disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="artistContact" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Artist's Contact (Phone or Email, if known)</FormLabel>
                        <FormControl><Input {...field} placeholder="Optional" disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <hr className="my-4"/>
                <FormField control={form.control} name="nominatorName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl><Input {...field} placeholder="Kulture Foundation" disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="nominatorEmail" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl><Input {...field} type="email" placeholder="kulture@example.com" disabled={isSubmitting} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? "Submitting..." : "Submit Nomination"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
