
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPosts, type Post } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rss } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from '@/components/ui/separator';

const blogCategories = ["All", "Family Support & Education", "Arts & Culture Promotion", "Community Storytelling", "Youth Empowerment"];

function FeaturedPostCard({ post }: { post: Post }) {
    const image = PlaceHolderImages.find(p => p.id === post.imageId);
    const authorImage = PlaceHolderImages.find(p => p.id === post.authorImageId);
    
    return (
        <div className="p-1">
            <Card className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl bg-card group h-full flex flex-col">
                 {image && (
                     <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative aspect-video">
                        <Image
                            src={image.imageUrl}
                            alt={post.title}
                            fill
                            data-ai-hint={image.imageHint}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </Link>
                )}
                <div className="flex flex-col flex-1 p-6">
                    <CardHeader className="p-0 mb-4">
                        <Badge variant="secondary" className="font-medium capitalize self-start">{post.category}</Badge>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                            <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                        </h3>
                        <p className="text-muted-foreground text-sm flex-1 mb-6">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    {authorImage && <AvatarImage src={authorImage.imageUrl} alt={post.author} />}
                                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <span className="font-semibold text-foreground">{post.author}</span>
                                    <time dateTime={new Date(post.date).toISOString()} className="block">
                                        {format(new Date(post.date), 'MMMM d, yyyy')}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

function PostCard({ post }: { post: Post }) {
    const image = PlaceHolderImages.find(p => p.id === post.imageId);
    const authorImage = PlaceHolderImages.find(p => p.id === post.authorImageId);

    return (
        <Card className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card group">
            {image && (
                 <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                    <Image
                        src={image.imageUrl}
                        alt={post.title}
                        width={600}
                        height={400}
                        data-ai-hint={image.imageHint}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            )}
            <CardHeader>
                 <Badge variant="secondary" className="font-medium capitalize self-start">{post.category}</Badge>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-6 pt-0">
                <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>

                </h3>
                <p className="text-muted-foreground text-sm flex-1 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            {authorImage && <AvatarImage src={authorImage.imageUrl} alt={post.author} />}
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <span className="font-semibold text-foreground">{post.author}</span>
                            <time dateTime={new Date(post.date).toISOString()} className="block">
                                {format(new Date(post.date), 'MMM d, yyyy')}
                            </time>
                        </div>
                    </div>
                     <Link href={`/blog/${post.slug}`} className="hidden md:flex items-center text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                       Read <ArrowRight className="ml-2 w-4 h-4"/>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function BlogPage() {
    const allPosts = useMemo(() => getAllPosts(), []);
    const featuredPosts = allPosts.slice(0, 4);
    
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredPosts = useMemo(() => {
        if (activeFilter === "All") return allPosts;
        return allPosts.filter(post => post.category === activeFilter);
    }, [activeFilter, allPosts]);

    return (
        <div className="bg-background">
        <Header />
        <main>
            <section className="py-24 sm:py-32 bg-secondary">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Rss className="w-4 h-4" />
                        <span>Updates & Insights</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                        Kulture Foundation Blog
                    </h1>
                    <p className="text-xl text-muted-foreground mx-auto">
                        Stay connected with our work. Get the latest updates, impact stories, and cultural insights from the field.
                    </p>
                </div>
            </div>
            </section>

            {featuredPosts.length > 0 && (
                <section className="py-24 sm:py-32">
                    <div className="container">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Featured Posts</h2>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-1">
                                {featuredPosts.map((post) => (
                                    <CarouselItem key={post.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                        <FeaturedPostCard post={post} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="ml-14"/>
                            <CarouselNext className="mr-14"/>
                        </Carousel>
                    </div>
                </section>
            )}

            <Separator />

            <section id="all-posts" className="py-24 sm:py-32">
                <div className="container">
                     <div className="flex flex-col items-center justify-between gap-6 mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">All Posts</h2>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {blogCategories.map(category => (
                                <Button 
                                    key={category}
                                    variant={activeFilter === category ? "default" : "outline"}
                                    onClick={() => setActiveFilter(category)}
                                    className="capitalize"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    {filteredPosts.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground mt-12 text-lg">No posts found for this category. Try another!</p>
                    )}
                    
                </div>
            </section>
        </main>
        <Footer />
        </div>
    );
}
 
