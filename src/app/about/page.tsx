

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Heart, Mic, BrainCircuit, BookOpen, Users, Target, Scale, Mail, Phone, ExternalLink, Check, Flame, HeartHandshake, Camera, Shield, Zap, Infinity, X, CheckCircle, Share2, Briefcase, HandHeart, Linkedin, Twitter, Power, GraduationCap } from "lucide-react";
import Link from "next/link";
import BackToTopButton from "@/components/back-to-top";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Metadata } from 'next';
import OurTeam from "@/components/sections/our-team";

export const metadata: Metadata = {
  title: 'About Kulture Foundation | Our Story, Mission, and Values',
  description: "Real Stories. Real People. Real Change. Learn what makes Kulture Foundation different.",
  openGraph: {
    title: 'About Kulture Foundation | Our Story, Mission, and Values',
    description: "We're not another NGO. We're a community-based organization built on authenticity, transparency, and impact. Learn what makes Kulture Foundation different.",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1739506314315-c7aff0d98d55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxVZ2FuZGFuJTIwcGVvcGxlfGVufDB8fHx8MTc2MTkxODMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
        width: 1200,
        height: 630,
        alt: 'A group of people at a Kulture Foundation workshop.',
      },
    ],
  },
};


const differentiators = [
    "Community-driven, not donor-driven",
    "Storytelling-centered (every person has dignity, every story has power)",
    "Transparent by design (we document everything)",
    "Multimedia-first (we use technology to scale impact)",
    "Sustainable pathways, not temporary handouts",
];

const values = [
    { icon: Flame, title: "AUTHENTICITY", text: "We tell real stories from real people. No filters. No exploitation. No savior complex." },
    { icon: HeartHandshake, title: "DIGNITY", text: "Every person we work with deserves respect, voice, and agency. We don't 'save' anyone—we walk alongside them." },
    { icon: Camera, title: "TRANSPARENCY", text: "We document every shilling, every project, every impact. Donors see exactly where their money goes." },
    { icon: Users, title: "COMMUNITY-DRIVEN", text: "Solutions come FROM communities, not imposed ON them. We listen first, act second." },
    { icon: Shield, title: "CULTURAL PRIDE", text: "We celebrate Ugandan culture unapologetically. Our heritage is our strength." },
    { icon: Zap, title: "HUSTLE & HEART", text: "We work hard with compassion. We understand struggle because we've lived it." },
    { icon: Infinity, title: "SUSTAINABILITY", text: "We don't create dependency. We build pathways to self-sufficiency." },
    { icon: Power, title: "EMPOWERMENT", text: "We provide tools, not charity. Our goal is to equip people to build their own futures." },
    { icon: GraduationCap, title: "EDUCATION", text: "We believe knowledge is the most powerful tool for breaking the cycle of poverty." },
];

const traditionalModelPoints = [
    "Heavy overhead and administrative costs",
    "Generic programs disconnected from real needs",
    "Donor reports full of jargon, light on truth",
    "Communities as 'beneficiaries' with no voice",
    "Temporary interventions with no follow-up",
];

const kultureWayPoints = [
    "Minimal overhead—maximum impact (most funds go directly to communities)",
    "Programs shaped BY community needs, not donor trends",
    "Radical transparency—we show you the receipts, the faces, the outcomes",
    "Beneficiaries are CO-CREATORS with full voice and dignity",
    "Long-term relationships—we don't disappear after the photo op",
];

const approachSteps = [
    { step: 1, title: "LISTEN", description: "We spend time in communities identifying real needs—not what funders want to hear." },
    { step: 2, title: "DOCUMENT", description: "We tell authentic stories through video, photography, and writing. Every person we work with controls their narrative." },
    { step: 3, title: "INTERVENE", description: "We provide direct support: school fees, materials, platforms for artists, recording elder wisdom, training youth." },
    { step: 4, title: "AMPLIFY", description: "We share these stories online, attracting resources and raising awareness." },
    { step: 5, title: "MEASURE", description: "We track real outcomes: Kids back in school. Artists earning income. Stories preserved. Lives changed." },
    { step: 6, title: "SCALE", description: "Success stories attract more support. We reinvest in more families, more artists, more communities." },
];

const joinUsActions = [
    { icon: Heart, title: "Donate", description: "Every shilling creates real impact. $1 feeds a child. $10 buys books. $50 changes a life.", cta: "Donate Now", href: "/donate" },
    { icon: Users, title: "Sponsor a Child", description: "Make a lasting impact through a one-on-one connection. Your monthly gift provides education and hope.", cta: "Sponsor Now", href: "/sponsorship" },
    { icon: Share2, title: "Share Our Stories", description: "Follow us on social media and share our documentaries. Visibility = Resources.", cta: "Follow Us", href: "https://www.facebook.com/kulturefoundationuganda", isExternal: true },
    { icon: HandHeart, title: "Volunteer", description: "Got skills? Time? Passion? We need content creators, mentors, field assistants.", cta: "Volunteer", href: "/volunteer" },
    { icon: Briefcase, title: "Partner With Us", description: "Corporate? Another NGO? Let's collaborate for bigger impact.", cta: "Partner", href: "/#contact" },
    { icon: BookOpen, title: "Tell Us Your Story", description: "Know a family that needs support? An artist who deserves a platform? A community story that needs to be documented?", cta: "Share a Story", href: "/story-hub#share-story" },
];


export default function AboutPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === "about-people");
    const founderImage = PlaceHolderImages.find(p => p.id === 'testimonial-david');


    return (
        <div className="bg-background">
            <Header />
            <main>
                {/* 1. Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center text-white">
                    {heroImage && (
                         <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            fill
                            data-ai-hint={heroImage.imageHint}
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 container text-center">
                         <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow-lg">
                            WE ARE KULTURE FOUNDATION.
                            <br/>
                            <span className="text-gold-gradient">WE ARE UGANDA RISING.</span>
                        </h1>
                    </div>
                </section>
                
                {/* Introduction Section */}
                <section className="py-24 sm:py-32">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center">
                                <p className="text-lg font-bold text-primary tracking-wider uppercase">Real Stories. Real People. Real Change.</p>
                                <h2 className="mt-6 text-3xl md:text-4xl font-bold text-foreground">
                                    We're not another NGO with fancy promises. We are a community-based organization built on a simple truth: those who've lived the struggle understand it best.
                                </h2>
                                <p className="mt-6 text-lg text-muted-foreground">
                                   From school fees for struggling children to platforms for underground artists, from preserving elder wisdom to training tomorrow's storytellers—we're building a Uganda where culture is currency and every voice matters. This is our story.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Our Story Section */}
                <section className="py-24 sm:py-32 bg-secondary">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">FROM STRUGGLE TO PURPOSE</h2>
                             <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                                Kulture Foundation was born from a simple truth: those who've lived through struggle understand it best.
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                           <div>
                                <p className="text-muted-foreground mb-6">
                                    Our founder knows what it means to hustle. To watch talented people buried by poverty. To see families choosing between food and school fees. To witness cultural knowledge dying with elders because no one's listening.
                                </p>
                                <p className="text-muted-foreground">
                                   After years of working with NGOs—including serving as CEO of Konnected Foundation Africa and founding Kelcherity Foundation—one thing became clear: the traditional NGO model often fails the very communities it claims to serve. Too much bureaucracy. Too little transparency. Too focused on donors, not beneficiaries.
                                </p>
                           </div>
                           <div>
                                <p className="font-bold text-foreground mb-4">So in 2025, Kulture Foundation was created differently:</p>
                                <div className="space-y-4">
                                {differentiators.map((point) => (
                                    <div key={point} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center mt-1">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="text-base text-foreground">{point}</span>
                                    </div>
                                ))}
                                </div>
                           </div>
                        </div>
                        <div className="text-center mt-16 max-w-3xl mx-auto">
                           <p className="text-2xl font-bold text-primary italic">We started with nothing but internet access, a camera, and heart. We're building an empire of impact—one family, one artist, one story at a time.</p>
                        </div>
                    </div>
                </section>
                
                 {/* 3. Mission, Vision, Values Section */}
                <section className="py-24 sm:py-32 bg-hero-gradient text-primary-foreground">
                    <div className="container space-y-20">
                        <div className="text-center">
                            <h2 className="text-lg font-bold tracking-widest uppercase mb-4 text-accent">Our Mission</h2>
                            <p className="text-2xl md:text-3xl font-semibold max-w-4xl mx-auto text-white/90">
                               To amplify marginalized voices through multimedia storytelling, provide direct support to struggling families, empower local artists, and preserve cultural heritage—creating sustainable pathways out of poverty rooted in dignity and community.
                            </p>
                        </div>
                         <div className="text-center">
                            <h2 className="text-lg font-bold tracking-widest uppercase mb-4 text-accent">Our Vision</h2>
                            <p className="text-xl md:text-2xl font-semibold max-w-4xl mx-auto text-white/90">
                              A Uganda where every child has access to education, every artist has a platform, every elder's wisdom is preserved, and every community member has opportunity to thrive through cultural empowerment and collective upliftment.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24 sm:py-32">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Our Values</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {values.map((value) => (
                                <div key={value.title} className="flex items-start gap-5 p-6 bg-secondary rounded-xl">
                                    <div className="flex-shrink-0 bg-primary/10 text-primary h-14 w-14 rounded-lg flex items-center justify-center">
                                        <value.icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-primary tracking-widest uppercase">{value.title}</h3>
                                        <p className="text-muted-foreground mt-1">{value.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* 4. What Makes Us Different Section */}
                <section className="py-24 sm:py-32 bg-secondary">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Why Kulture Foundation is Different</h2>
                             <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                                Most NGOs in Uganda follow the same playbook. We don't.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-2xl text-red-800 dark:text-red-300">
                                        <X className="h-7 w-7 bg-red-600 text-white rounded-full p-1" />
                                        Traditional NGO Model
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {traditionalModelPoints.map(point => (
                                        <div key={point} className="flex items-start gap-3">
                                            <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                                            <span className="text-foreground/80">{point}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-2xl text-green-800 dark:text-green-300">
                                        <Check className="h-7 w-7 bg-green-600 text-white rounded-full p-1" />
                                        The Kulture Foundation Way
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     {kultureWayPoints.map(point => (
                                        <div key={point} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-foreground/80">{point}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                         <div className="max-w-2xl mx-auto mt-16 text-center">
                            <h3 className="text-2xl font-bold text-foreground">We're an NGO built for the digital age:</h3>
                             <p className="mt-4 text-lg text-muted-foreground">
                                Online-first operations (low costs, high reach) → Multimedia storytelling (every intervention documented) → Social media-driven fundraising (direct connection between donors and impact) → Grassroots + global (rooted locally, visible globally)
                            </p>
                        </div>
                    </div>
                </section>
                
                 {/* 5. Our Approach Section */}
                <section className="py-24 sm:py-32">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">How We Work: The Kulture Foundation Model</h2>
                        </div>
                        <div className="relative max-w-4xl mx-auto">
                            {/* Dotted line for visual connection on larger screens */}
                            <div className="hidden lg:block absolute top-8 left-8 w-px h-[calc(100%-4rem)] bg-border border-l-2 border-dashed"></div>

                            <div className="space-y-12">
                                {approachSteps.map(item => (
                                    <div key={item.step} className="relative flex items-start gap-8">
                                        <div className="flex-shrink-0 z-10 bg-background">
                                            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-lg">
                                                {item.step}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold uppercase tracking-widest text-primary mb-1">{`Step ${item.step}: ${item.title}`}</h3>
                                            <p className="text-lg text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="text-center mt-16 max-w-3xl mx-auto">
                            <p className="text-2xl font-bold text-primary">It's a cycle of storytelling → support → impact → more storytelling.</p>
                            <p className="text-2xl font-bold text-foreground mt-2">And it's working.</p>
                        </div>
                    </div>
                </section>

                {/* 6. Meet the Founder */}
                <section className="py-24 sm:py-32 bg-secondary">
                    <div className="container">
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <p className="text-lg text-muted-foreground">This isn't an NGO created from a boardroom. It was forged in the fire of personal sacrifice and spiritual guidance.</p>
                        </div>
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                            <div className="md:col-span-1">
                                {founderImage && (
                                    <Avatar className="h-48 w-48 mx-auto border-4 border-primary shadow-lg">
                                        <AvatarImage src={founderImage.imageUrl} alt="Ssebunya Edgar" />
                                        <AvatarFallback className="text-5xl">SE</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                            <div className="md:col-span-2 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-foreground">Meet Ssebunya Edgar</h2>
                                <p className="text-xl font-semibold text-primary">Founder & Executive Director</p>
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto mt-12 space-y-6 text-lg text-muted-foreground">
                            <p>To understand Kulture Foundation, you must first understand the journey of its founder, Ssebunya Edgar. For years, he built brands—the pioneering <strong>256 Hiphop Awards</strong>, the online <strong>Kulture Radio</strong>, and more. He built a community of over 200,000 followers. But success felt hollow.</p>
                            
                            <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 text-xl font-semibold italic text-foreground">
                               "My ancestors had to bring me back to the foundation. My brands went silent because my spirit was being called to build a legacy, not just a business. Kulture Foundation is that calling."
                            </blockquote>

                            <p>This isn't an NGO created from a boardroom. It was forged in the fire of personal sacrifice and spiritual guidance. The skills learned building media platforms and large-scale events are now channeled into a single, focused mission: to uplift his community with dignity and truth.</p>
                            
                            <p>Kulture Foundation is the culmination of that journey—the raw, unfiltered answer to the question, "How do we build something that truly serves the people?" With a unique blend of street-level hustle, strategic vision, and a deep-seated love for his culture, Ssebunya Edgar is not just running an NGO; he is answering a sacred call.</p>
                            
                            <div className="flex flex-wrap gap-4 items-center justify-center">
                                <Button asChild variant="outline"><a href="mailto:kulturefoundationug@gmail.com"><Mail className="mr-2 h-4 w-4" /> Email</a></Button>
                                <Button asChild variant="outline"><a href="tel:+256792583150"><Phone className="mr-2 h-4 w-4" /> Phone</a></Button>
                                <Button asChild variant="outline"><a href="https://www.linkedin.com/company/kulture-foundation/" target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" />LinkedIn</a></Button>
                                <Button asChild variant="outline"><a href="https://twitter.com/KultureFoundUG" target="_blank" rel="noopener noreferrer"><Twitter className="mr-2 h-4 w-4" />Twitter</a></Button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <OurTeam />

                {/* 7. Join Us CTA */}
                <section className="py-24 sm:py-32">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">BE PART OF THE MOVEMENT</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                                Kulture Foundation works because people like you believe in it. Here's how you can join:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {joinUsActions.map((action) => (
                                <Card key={action.title} className="flex flex-col items-center text-center p-8 bg-secondary">
                                    <div className="bg-primary/10 text-primary h-16 w-16 rounded-full flex items-center justify-center mb-6">
                                        <action.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">{action.title}</h3>
                                    <p className="text-muted-foreground flex-1 mb-6">{action.description}</p>
                                    <Button asChild className="w-full">
                                        <Link href={action.href} target={action.isExternal ? '_blank' : '_self'} rel={action.isExternal ? 'noopener noreferrer' : ''}>{action.cta}</Link>
                                    </Button>
                                </Card>
                            ))}
                        </div>
                         <div className="text-center mt-16 max-w-2xl mx-auto">
                            <p className="text-2xl font-bold text-primary">Together, we're not just changing lives. We're preserving heritage and empowering futures.</p>
                             <p className="text-2xl font-bold text-foreground mt-2">This is Kulture Foundation. This is Uganda rising.</p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
            <BackToTopButton />
        </div>
    );
}
 
