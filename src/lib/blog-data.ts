export type Post = {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorImageId: string;
  date: string;
  imageId: string;
  excerpt: string;
  content: string;
  category: "Family Support & Education" | "Arts & Culture Promotion" | "Community Storytelling" | "Youth Empowerment";
};

const posts: Post[] = [
  {
    id: '1',
    slug: 'the-power-of-a-single-story',
    title: 'The Power of a Single Story: Why We Document Everything',
    author: 'Ssebunya Edgar',
    authorImageId: 'testimonial-david',
    date: '2025-07-20',
    imageId: 'blog-post-1',
    excerpt: 'We believe that every person has dignity, and every story has power. Discover why storytelling is at the very core of our mission.',
    content: `<p>At 256 Estates Foundation, we lead with the narrative because we understand a fundamental truth: data moves minds, but stories move hearts.</p>`,
    category: 'Community Storytelling',
  }
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}