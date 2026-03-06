
export type Post = {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorImageId: string;
  date: string; // ISO 8601 format
  imageId: string;
  excerpt: string;
  content: string; // This will be treated as raw HTML
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
    excerpt: 'We believe that every person has dignity, and every story has power. Discover why storytelling is at the very core of our mission and how it drives real, measurable change in the communities we serve.',
    content: `
      <p>At Kulture Foundation, we are not just an NGO; we are a storytelling organization. We lead with the narrative because we understand a fundamental truth: data moves minds, but stories move hearts. And it is hearts, moved to action, that create lasting change.</p>
      
      <h3>From Exploitation to Empowerment</h3>
      <p>For too long, the non-profit world has used stories of suffering as a tool for fundraising, often stripping individuals of their dignity in the process. We reject this model. Our approach is different. We see storytelling not as a means of extraction, but as an act of empowerment.</p>
      <p>When we sit down with a family, an artist, or a community elder, our first role is to listen. We provide a platform for them to share their experiences in their own words, on their own terms. They are the authors of their own narratives, and we are simply the custodians of their truth.</p>
      
      <h3>Our Storytelling Cycle</h3>
      <ol>
        <li><strong>Listen & Document:</strong> We use professional video and photography to capture authentic stories, ensuring the highest respect for the individual.</li>
        <li><strong>Amplify:</strong> We share these stories through our online platforms, connecting grassroots realities with a global audience.</li>
        <li><strong>Attract Resources:</strong> A powerful, authentic story is the most effective way to attract support. It allows donors to connect with a person, not a problem.</li>
        <li><strong>Create Impact:</strong> The resources generated are funneled directly back into the community to solve the very problems highlighted in the story—funding school fees, providing art supplies, or supporting a family.</li>
        <li><strong>Document the Impact:</strong> We then close the loop by documenting the transformation. The story of struggle becomes a story of impact, hope, and empowerment.</li>
      </ol>

      <p>This is not just a communications strategy; it is our entire operational model. By putting stories first, we ensure that our work remains grounded in the real needs of real people. It keeps us accountable, transparent, and, most importantly, human.</p>
    `,
    category: 'Community Storytelling',
  },
  {
    id: '2',
    slug: 'weaving-the-future-preserving-ugandas-craft-heritage',
    title: "Weaving the Future: Preserving Uganda's Craft Heritage",
    author: 'Kulture Foundation Team',
    authorImageId: 'logo',
    date: '2025-07-15',
    imageId: 'blog-post-2',
    excerpt: "The intricate art of basket weaving is more than just a craft; it's a language of history, community, and identity. Learn how we're working to ensure this vital cultural knowledge is passed on to the next generation.",
    content: `
      <p>In a small village outside of Masaka, a group of women sit together under the shade of a mango tree. Their hands, a blur of motion, transform strands of raffia and palm leaves into intricate, colorful baskets. Each pattern tells a story, each design a piece of history passed down through generations.</p>
      <p>This is not just a craft; it's a cultural library. But this library is at risk of closing its doors forever.</p>
      
      <h3>The Challenge: A Fading Tradition</h3>
      <p>With the rise of mass-produced goods and a lack of economic opportunities in traditional crafts, younger generations are often not learning these ancient skills. The master weavers, mostly elderly women, hold a vast repository of knowledge that could disappear within a generation.</p>
      
      <h3>Our Initiative: The Kulture Weavers Guild</h3>
      <p>Through our Arts & Culture Promotion program, Kulture Foundation has partnered with this community to form the Kulture Weavers Guild. The program has two main goals:</p>
      <ul>
        <li><strong>Preservation:</strong> We fund apprenticeship programs where elder weavers mentor young women and men, ensuring the techniques and patterns are passed down. We also document the process and the stories behind the designs.</li>
        <li><strong>Economic Empowerment:</strong> We provide the weavers with higher-quality, sustainable materials and connect them to a wider market through our online shop. This transforms their craft from a hobby into a viable source of income, giving them a direct economic incentive to continue the tradition.</li>
      </ul>
      
      <p>By purchasing a hand-woven basket from our shop, you are doing more than acquiring a beautiful piece of art. You are investing in the preservation of Ugandan culture and empowering a woman to support her family. You are helping us weave the future.</p>
    `,
    category: 'Arts & Culture Promotion',
  },
  {
    id: '3',
    slug: 'why-a-pencil-is-more-than-a-pencil',
    title: "The Ripple Effect: Why a Pencil is More Than a Pencil",
    author: 'Ssebunya Edgar',
    authorImageId: 'testimonial-david',
    date: '2025-07-10',
    imageId: 'blog-post-3',
    excerpt: 'We provided school supplies to 50 children in a rural community. The result wasn\'t just better grades—it was a wave of hope that lifted the entire village. An update from our Family Support program.',
    content: `
      <p>Last month, thanks to the support of our donors, we distributed scholastic materials to 50 students at the Bweya Primary School. On the surface, it was a simple act: handing out notebooks, pens, mathematical sets, and new school shoes.</p>
      <p>But the impact of that single act has created ripples we are only just beginning to see.</p>
      
      <h3>The Immediate Impact</h3>
      <p>For the children, the effect was instant. Shame was replaced with pride. The anxiety of not having the right materials was replaced with the confidence to participate in class.</p>
      <p><em>"I used to share one pen with my two brothers,"</em> 10-year-old Joseph told us. <em>"Now I have my own. I can do all my homework."</em></p>
      
      <h3>The Impact on Families</h3>
      <p>For the parents, the relief was palpable. The small amount of money they would have spent on school supplies—money most of them did not have—could now be used for food, medicine, or investing in their small businesses. A mother told us she was finally able to buy seeds to plant for the next season.</p>
      
      <h3>The Impact on Teachers</h3>
      <p>The teachers at Bweya Primary reported a noticeable change in the classroom. <em>"Attendance went up almost immediately,"</em> said the headmistress. <em>"The children are more engaged, more confident. It has made our job of teaching easier and more joyful."</em></p>
      
      <p>This is what we mean by the ripple effect. A simple intervention, a small investment, doesn't just solve one problem. It creates a cascade of positive change that can uplift an entire community. A pencil is never just a pencil. It's a tool of empowerment, a symbol of hope, and a key to a brighter future.</p>
    `,
    category: 'Family Support & Education',
  },
  {
    id: '4',
    slug: 'digital-dreams-empowering-kampalas-youth',
    title: "Digital Dreams: Empowering Kampala's Youth for the Future",
    author: 'Kulture Foundation Team',
    authorImageId: 'logo',
    date: '2025-07-05',
    imageId: 'cause-youth',
    excerpt: 'In a rapidly changing world, digital skills are not a luxury; they are a necessity. Our new Youth Empowerment program is equipping young Ugandans with the tools they need to succeed in the digital economy.',
    content: `
      <p>In the bustling streets of Kampala, there is a generation of young, ambitious Ugandans full of potential. However, many lack the skills needed to participate in the global digital economy. Our Youth Empowerment program aims to bridge this gap.</p>
      
      <h3>The Program</h3>
      <p>We have launched a 3-month intensive training course focused on:</p>
      <ul>
        <li><strong>Digital Literacy:</strong> From basic computer skills to mastering online communication tools.</li>
        <li><strong>Content Creation:</strong> Photography, basic video editing, and graphic design for social media.</li>
        <li><strong>Online Marketing:</strong> Learning how to build a brand and market products or services online.</li>
        <li><strong>Entrepreneurship:</strong> Guidance on how to turn these new skills into a freelance career or a small business.</li>
      </ul>
      
      <p>Our first cohort of 30 students is already showing incredible promise. They are not just learning skills; they are building confidence and imagining new possibilities for their futures.</p>
      <p>By investing in youth, we are investing in the future of Uganda. These young people will become the creators, innovators, and entrepreneurs who will drive their communities forward.</p>
    `,
    category: 'Youth Empowerment',
  },
];


export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}
