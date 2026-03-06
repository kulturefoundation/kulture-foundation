
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useUser, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter, FirestorePermissionError } from "@/lib/errors";
import type { Event } from "@/lib/events-data";


const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
});

interface EventRegistrationDialogProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventRegistrationDialog({ event, isOpen, onClose }: EventRegistrationDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  
  useEffect(() => {
    if (user && isOpen) {
        form.setValue('fullName', user.displayName || '');
        form.setValue('email', user.email || '');
    } else if (!isOpen) {
        form.reset({ fullName: "", email: ""});
    }
  }, [user, form, isOpen]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database Not Available",
            description: "Could not process registration. Please try again later.",
        });
        setIsSubmitting(false);
        return;
    }

    try {
        const registrationsCollection = collection(firestore, 'event_registrations');
        const newRegistration = {
            eventTitle: event?.title,
            ...values,
            userId: user?.uid || null,
            registeredAt: serverTimestamp()
        };

        addDoc(registrationsCollection, newRegistration).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: registrationsCollection.path,
                operation: 'create',
                requestResourceData: newRegistration,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

        toast({
            title: "Registration Successful!",
            description: `Thank you for registering for ${event?.title}. We've sent a confirmation to your email.`,
        });
        form.reset();
        onClose();

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Registration Failed",
            description: error.message || "An unexpected error occurred. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for: {event.title}</DialogTitle>
          <DialogDescription>
            Fill in your details below to reserve your spot.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Kulture Foundation" disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input {...field} type="email" placeholder="kulture@example.com" disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
