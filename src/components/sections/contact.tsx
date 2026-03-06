
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter, FirestorePermissionError } from "@/lib/errors";


const formSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phoneCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(20, "Message must be at least 20 characters."),
});


export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phoneCode: "+256", phoneNumber: "", subject: "", message: "" },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database connection failed",
            description: "Could not submit your message. Please try again later.",
        });
        setIsSubmitting(false);
        return;
    }
    
    try {
        const contactsCollection = collection(firestore, 'contacts');
        const newContactMessage = {
            name: values.name,
            email: values.email,
            phone: `${values.phoneCode || ''}${values.phoneNumber || ''}`,
            subject: values.subject,
            message: values.message,
            submittedAt: serverTimestamp(),
            status: 'unread',
        };

        addDoc(contactsCollection, newContactMessage)
            .catch(serverError => {
                const permissionError = new FirestorePermissionError({
                    path: contactsCollection.path,
                    operation: 'create',
                    requestResourceData: newContactMessage,
                });
                errorEmitter.emit('permission-error', permissionError);
            });

        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We will get back to you shortly.",
        });
        form.reset();

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

  return (
    <section id="contact" className="py-24 sm:py-32 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">LET'S BUILD TOGETHER</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Whether you want to donate, volunteer, partner, or share a story that needs to be told—we want to hear from you.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl text-primary">Send Us a Message</CardTitle>
                <CardDescription>We typically respond within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} placeholder="Kulture Foundation" disabled={isSubmitting}/></FormControl><FormMessage /></FormItem>
                        )} />
                        
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" {...field} placeholder="kulture@example.com" disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>

                    <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <div className="flex gap-2">
                           <FormField
                              control={form.control}
                              name="phoneCode"
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                  <FormControl>
                                    <SelectTrigger className="w-[120px]">
                                      <SelectValue placeholder="Code" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="+256">UG +256</SelectItem>
                                    <SelectItem value="+254">KE +254</SelectItem>
                                    <SelectItem value="+255">TZ +255</SelectItem>
                                    <SelectItem value="+250">RW +250</SelectItem>
                                    <SelectItem value="+1">USA +1</SelectItem>
                                    <SelectItem value="+44">UK +44</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                                <FormControl>
                                <Input type="tel" {...field} placeholder="792 583 150" className="flex-1" disabled={isSubmitting} />
                                </FormControl>
                            )} />
                        </div>
                         <FormMessage />
                    </FormItem>


                    <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem><FormLabel>Subject *</FormLabel><FormControl><Input {...field} placeholder="Partnership Inquiry" disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Message *</FormLabel><FormControl><Textarea rows={5} {...field} placeholder="Tell us how we can help..." disabled={isSubmitting} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <Button type="submit" size="lg" disabled={isSubmitting} className="bg-accent text-white hover:bg-accent/90">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </form>
                </Form>
            </CardContent>
          </Card>
      </div>
    </section>
  );
}
 
