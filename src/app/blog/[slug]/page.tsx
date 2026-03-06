
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/blog-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/social-share';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  const image = PlaceHolderImages.find(p => p.id === post.imageId);

  return {
    title: `${post.title} | Kulture Foundation Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Kulture Foundation Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: image ? [
        {
          url: image.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Kulture Foundation Blog`,
      description: post.excerpt,
      images: image ? [image.imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find(p => p.id === post.imageId);
  const authorImage = PlaceHolderImages.find(p => p.id === post.authorImageId);

  return (
    <div className="bg-background">
      <Header />
      <main className="py-24 sm:py-32">
        <div className="container max-w-4xl mx-auto relative">
          <SocialShare title={post.title} slug={post.slug} type="blog" />
          <article>
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="font-medium capitalize">{post.category}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground">
                  <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                          {authorImage && <AvatarImage src={authorImage.imageUrl} alt={post.author} />}
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <span className="font-semibold text-foreground">{post.author}</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={new Date(post.date).toISOString()}>
                          {format(new Date(post.date), 'MMMM d, yyyy')}
                      </time>
                  </div>
              </div>
            </header>

            {image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-12">
                  <Image
                      src={image.imageUrl}
                      alt={post.title}
                      fill
                      data-ai-hint={image.imageHint}
                      className="object-cover"
                      priority
                  />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 prose-h2:text-foreground prose-h3:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
              <p className="lead text-xl text-muted-foreground">{post.excerpt}</p>
              <Separator className="my-8"/>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="text-center mt-16">
              <Button asChild variant="outline">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Posts
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
 
