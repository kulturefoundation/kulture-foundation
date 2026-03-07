export type Story = {
  slug: string;
  title: string;
  author: string;
  authorImageId: string;
  date: string;
  imageId: string;
  excerpt: string;
  content: string;
};

const stories: Story[] = [
  {
    slug: 'from-dropout-to-dreams-aminas-story',
    title: "From Dropout to Dreams: Amina's Story",
    author: '256 Estates Team',
    authorImageId: 'logo',
    date: '2025-10-15',
    imageId: 'testimonial-maria',
    excerpt: "Amina, 14, was forced to drop out of school. See how a small investment in school fees changed her family's future.",
    content: `<h2>THE STRUGGLE</h2><p>Amina used to wake up at 5 AM every day—not to go to school, but to help her mother sell vegetables.</p><p>Through our <strong>Family Support & Education Program</strong>, we intervened with school fees and materials. Today, she is back in class and chasing her dream of becoming a teacher.</p>`,
  },
  {
    slug: 'the-sound-of-opportunity-rebeccas-story',
    title: "The Sound of Opportunity: Rebecca's Story",
    author: 'Ssebunya Edgar',
    authorImageId: 'testimonial-david',
    date: '2025-09-22',
    imageId: 'event-showcase',
    excerpt: "Rebecca K, 28, is a talented painter with no platform. See how a spotlight changed her career.",
    content: `<h2>A SPOTLIGHT IN THE DARK</h2><p>Rebecca spent her days creating vibrant paintings with no audience. We provided a professional photoshoot and featured her on our platforms. Within a month, she sold five paintings and secured a hotel commission.</p>`,
  },
];

export function getAllStories(): Story[] {
  return [...stories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find(story => story.slug === slug);
}