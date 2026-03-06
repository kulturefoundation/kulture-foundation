
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPosts, type Post } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function PostCardSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden rounded-2xl shadow-lg bg-card">
            <Skeleton className="h-56 w-full" />
            <CardHeader>
                <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-6 pt-0">
                <Skeleton className="h-7 w-full mb-3" />
                <Skeleton className="h-7 w-3/4 mb-6" />
                 <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="space-y-2">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
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
                <h3 className="text-xl font-bold text-primary mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">{post.title}</Link>
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
                </div>
            </CardContent>
        </Card>
    );
}

export default function LatestPosts() {
  const latestPosts = getAllPosts().slice(0, 4);
  const isLoading = false;
  
  if (!latestPosts || latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">From Our Blog</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Get the latest updates, stories, and insights from the Kulture Foundation team.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <PostCardSkeleton key={i} />)
            ) : (
                latestPosts?.map(post => (
                    <PostCard key={post.slug} post={post} />
                ))
            )}
        </div>

        <div className="text-center mt-16">
            <Button size="lg" asChild className="bg-accent text-white hover:bg-accent/90">
                <Link href="/blog">
                    Read More Articles <ArrowRight className="ml-2 w-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
 
