

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { type Cause } from '@/lib/causes-data';
import { type SponsoredChild } from '@/lib/sponsorship-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, Gift, Target, CheckCircle, GraduationCap, HandHeart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { errorEmitter } from "@/lib/errors";
import { FirestorePermissionError } from "@/lib/errors";
import { Separator } from '@/components/ui/separator';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Progress } from '@/components/ui/progress';
import { AnimatedCounter } from '@/components/animated-counter';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import Link from 'next/link';

type Currency = 'UGX' | 'USD';

const formSchema = z.object({
  sponsorName: z.string().min(2, "Please enter your name."),
  sponsorEmail: z.string().email("Please provide a valid email address."),
  sponsorPhone: z.string().optional(),
  message: z.string().optional(),
  amount: z.coerce.number().min(1, "Donation amount must be greater than 0."),
  currency: z.enum(['UGX', 'USD']),
});


const fakeDonors = [
  { name: 'Sarah J.', avatar: 'testimonial-grace', fallback: 'SJ', amount: '$25' },
  { name: 'Edgar S.', avatar: 'testimonial-david', fallback: 'ES', amount: 'UGX 50,000' },
  { name: 'Michael K.', avatar: 'testimonial-maria', fallback: 'MK', amount: '$50' },
  { name: 'Amina N.', avatar: 'about-people', fallback: 'AN', amount: 'UGX 20,000' },
];

const sponsorshipProvides = [
    { icon: GraduationCap, text: "School Fees & Uniform" },
    { icon: HandHeart, text: "Nutritious Meals" },
    { icon: Shield, text: "Basic Healthcare" },
];

export function SponsorshipPageClient({ cause, child }: { cause?: Cause, child?: SponsoredChild }) {
  const firestore = useFirestore();
  const item = cause || child;
  
  const isCause = !!cause;
  const isChild = !!child;

  const image = item ? PlaceHolderImages.find(p => p.id === item.imageId) : undefined;
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
        sponsorName: "", 
        sponsorEmail: "",
        sponsorPhone: "",
        message: "",
        amount: isCause ? 50000 : (child?.sponsorshipGoal ?? 150000),
        currency: 'UGX'
    },
  });
  
  useEffect(() => {
    if (user) {
      form.setValue('sponsorName', user.displayName || '');
      form.setValue('sponsorEmail', user.email || '');
      form.setValue('sponsorPhone', user.phoneNumber || '');
    }
  }, [user, form]);
  
  const logoImage = PlaceHolderImages.find(p => p.id === "kulture-foundation-logo");
  const currency = form.watch('currency');
  const amount = form.watch('amount');

  const handleCurrencyChange = (newCurrency: Currency) => {
    form.setValue('currency', newCurrency);
    if (isCause) {
        if (newCurrency === 'UGX') {
        form.setValue('amount', 50000);
        } else {
        form.setValue('amount', 20);
        }
    } else if (child) {
        if (newCurrency === 'UGX') {
            form.setValue('amount', child.sponsorshipGoal);
        } else {
            // Rough conversion, you might want a better rate
            form.setValue('amount', Math.round(child.sponsorshipGoal / 3800));
        }
    }
  }

  const handleSponsorshipPayment = useFlutterwave({
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK-7ca593dd09440208bacb4190a0c83b19-X',
    tx_ref: `kulture-${isCause ? 'cause' : 'child'}-${item?.id}-${Date.now()}`,
    amount: amount,
    currency: currency,
    payment_options: "card,mobilemoneyuganda,ussd,banktransfer",
    customer: {
      email: form.getValues('sponsorEmail') || user?.email || '',
      phone_number: form.getValues('sponsorPhone') || process.env.NEXT_PUBLIC_DEFAULT_PHONE_NUMBER || '+256792583150',
      name: form.getValues('sponsorName') || user?.displayName || '',
    },
    customizations: {
      title: isCause ? `Donation for ${cause?.title}` : `Sponsorship for ${child?.name}`,
      description: isCause ? `Your generous contribution to this cause.` : `Your monthly sponsorship commitment.`,
      logo: logoImage?.imageUrl || "https://kulturefoundation.org/kulture-foundation-logo.png",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database Not Available",
            description: "Could not submit your donation inquiry. Please try again later.",
        });
        setIsSubmitting(false);
        return;
    }

    const minAmount = isChild && child ? (values.currency === 'UGX' ? child.sponsorshipGoal : Math.round(child.sponsorshipGoal / 3800)) : (values.currency === 'UGX' ? 1000 : 1);
    if (values.amount < minAmount) {
        toast({
            variant: "destructive",
            title: "Invalid Amount",
            description: `Donation must be at least ${values.currency} ${minAmount.toLocaleString()}.`,
        });
        setIsSubmitting(false);
        return;
    }

    handleSponsorshipPayment({
        callback: async (response) => {
            if (response.status === "successful") {
                let itemName = "a cause";
                if (item) {
                    if ('title' in item && typeof item.title === 'string') {
                        itemName = item.title;
                    } else if ('name' in item) {
                        itemName = item.name;
                    }
                }
                toast({
                    title: "Impact Made! Thank You!",
                    description: `Your support for ${itemName} is creating real change. We are incredibly grateful.`,
                });

                if (isCause && cause) {
                    const causeRef = doc(firestore, 'causes', cause.id);
                    await updateDoc(causeRef, {
                        raised: increment(values.amount)
                    }).catch(serverError => {
                        const permissionError = new FirestorePermissionError({
                            path: causeRef.path,
                            operation: 'update',
                            requestResourceData: { raised: `increment(${values.amount})` },
                        });
                        errorEmitter.emit('permission-error', permissionError);
                    });
                }
                
                // You could add logic here to mark a child as sponsored if the goal is met.

            } else {
                toast({
                    variant: "destructive",
                    title: "Payment Failed",
                    description: "Something went wrong. Please try again.",
                });
            }
            closePaymentModal();
            setIsSubmitting(false);
        },
        onClose: () => {
            setIsSubmitting(false);
        },
     });
  }

  if (!item) {
    // This handles the case where neither cause nor child is provided.
    // In a real scenario, this might render a "Not Found" message or redirect.
    return null;
  }

  return (
     <main>
        <section className="relative h-[50vh] flex items-center justify-center text-white">
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={('title' in item) ? item.title : item.name}
                    fill
                    data-ai-hint={image.imageHint}
                    className="object-cover"
                    priority
                />
            )}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 container text-center">
                 {isCause && cause && (
                    <div className="inline-block bg-accent text-accent-foreground text-sm font-semibold px-4 py-2 rounded-full mb-4">
                        {cause.category}
                    </div>
                 )}
                 {isChild && (
                    <div className="inline-block bg-accent text-accent-foreground text-sm font-semibold px-4 py-2 rounded-full mb-4">
                        Sponsor a Child
                    </div>
                 )}
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    {('title' in item) ? item.title : item.name}
                </h1>
                {isChild && child && <p className="mt-4 text-lg text-white/90">{child.age} years old • {child.gender} • {child.location}</p>}
            </div>
        </section>

        <section className="py-24 sm:py-32">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">{isCause ? "About This Cause" : `About ${child?.name}`}</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
                          <p>{isCause && cause ? cause.longDescription : (child ? child.story : '')}</p>
                        </div>

                        {isChild && child && (
                             <Card className="mt-12 bg-secondary">
                                <CardHeader>
                                    <CardTitle>Your Sponsorship Provides:</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {sponsorshipProvides.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                                    <item.icon className="w-6 h-6"/>
                                                </div>
                                                <span className="font-semibold text-foreground">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                             </Card>
                        )}
                         <Button asChild variant="link" className="mt-12">
                            <Link href="/sponsorship">
                                ← Back to see all children
                            </Link>
                        </Button>
                    </div>
                    <div className="lg:col-span-1">
                      <Card id="donation-form" className="sticky top-28 bg-secondary shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <Target className="text-primary"/>
                                {isCause ? "Cause Progress" : "Sponsorship Status"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isCause && cause && (
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-end text-lg">
                                        <div>
                                            <span className="text-xs uppercase tracking-wider text-muted-foreground block">Raised</span>
                                            <span className="font-bold text-3xl text-primary">
                                                $<AnimatedCounter target={cause.raised} />
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs uppercase tracking-wider text-muted-foreground block">Goal</span>
                                            <span className="font-bold text-xl text-foreground">
                                                ${cause.goal.toLocaleString()}
                                            </span>
                                        </div>

                                    </div>
                                    <Progress value={(cause.raised / cause.goal) * 100} className="h-3" />
                                </div>
                            )}

                            {isChild && child && child.sponsorshipStatus === 'sponsored' && (
                                <div className="text-center py-8">
                                    <Badge variant="default" className="text-lg px-4 py-2 bg-primary text-primary-foreground">Fully Sponsored!</Badge>
                                    <p className="mt-4 text-muted-foreground">Thank you! {child.name} has a sponsor. You can still support other children or our general fund.</p>
                                    <Button className="mt-4" asChild>
                                        <Link href="/sponsorship">See Other Children</Link>
                                    </Button>
                                </div>
                            )}
                            
                            { (isCause || (isChild && child && child.sponsorshipStatus === 'unsponsored')) && (
                                <>
                                    <Separator className="my-6" />

                                    <Form {...form}>
                                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                          <FormField control={form.control} name="sponsorName" render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Full Name *</FormLabel>
                                              <FormControl><Input {...field} placeholder="Kulture Foundation" disabled={isSubmitting} /></FormControl>
                                              <FormMessage />
                                          </FormItem>
                                          )} />
                                          <FormField control={form.control} name="sponsorEmail" render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Email Address *</FormLabel>
                                              <FormControl><Input type="email" {...field} placeholder="kulture@example.com" disabled={isSubmitting} /></FormControl>
                                              <FormMessage />
                                          </FormItem>
                                          )} />
                                          <FormField control={form.control} name="sponsorPhone" render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Phone Number (Optional)</FormLabel>
                                              <FormControl><Input type="tel" {...field} placeholder="+256 712 345678" disabled={isSubmitting} /></FormControl>
                                              <FormMessage />
                                          </FormItem>
                                          )} />

                                          <FormField control={form.control} name="message" render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Message (Optional)</FormLabel>
                                              <FormControl>
                                                <Textarea 
                                                  {...field}
                                                  placeholder="Leave a message of encouragement..."
                                                  disabled={isSubmitting}
                                                  rows={3}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )} />

                                          <div>
                                              <FormLabel>{isChild ? "Sponsorship Amount *" : "Donation Amount *"}</FormLabel>
                                              <div className="flex justify-center mt-2 mb-2">
                                                  <div className="inline-flex rounded-lg border p-1 bg-background">
                                                      <Button type="button" variant={currency === 'UGX' ? 'secondary' : 'ghost'} onClick={() => handleCurrencyChange('UGX')} className="rounded-md">UGX</Button>
                                                      <Button type="button" variant={currency === 'USD' ? 'secondary' : 'ghost'} onClick={() => handleCurrencyChange('USD')} className="rounded-md">USD</Button>
                                                  </div>
                                              </div>
                                              <FormField control={form.control} name="amount" render={({ field }) => (
                                                  <FormItem>
                                                  <FormControl>
                                                      <div className="flex items-center justify-center gap-2">
                                                          <span className="text-lg font-semibold">{currency === 'UGX' ? 'UGX' : '$'}</span>
                                                          <Input 
                                                              type="number"
                                                              {...field}
                                                              className="text-xl font-bold h-12 w-40 text-center"
                                                              disabled={isSubmitting || (isChild && child !== undefined)}
                                                          />
                                                      </div>
                                                  </FormControl>
                                                  <FormMessage className="text-center"/>
                                                  </FormItem>
                                              )} />
                                          </div>
                                        
                                        <Button size="lg" className="w-full h-12 text-lg" type="submit" disabled={isSubmitting}>
                                          {isSubmitting ? (
                                              <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                                          ) : (
                                            <Heart className="mr-2 h-5 w-5"/>
                                          )}
                                          {isSubmitting ? "Processing..." : (isChild && child ? `Sponsor ${child.name}` : "Donate Now")}
                                        </Button>
                                      </form>
                                    </Form>
                                </>
                             )}
                            
                            <div className="mt-8">
                                <h4 className="font-bold text-center mb-4">Recent Supporters</h4>
                                <div className="space-y-3">
                                    {fakeDonors.map(donor => {
                                        const donorImage = PlaceHolderImages.find(p => p.id === donor.avatar);
                                        return (
                                            <div key={donor.name} className="flex items-center gap-3 text-sm">
                                                <Avatar className="h-8 w-8">
                                                    {donorImage && <AvatarImage src={donorImage.imageUrl} />}
                                                    <AvatarFallback>{donor.fallback}</AvatarFallback>
                                                </Avatar>
                                                <p className="text-muted-foreground"><span className="font-semibold text-foreground">{donor.name}</span> just donated <span className="font-semibold text-primary">{donor.amount}</span></p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </CardContent>
                      </Card>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
 
