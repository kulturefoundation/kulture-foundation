
import { GraduationCap, Palette, BookOpen, BrainCircuit } from "lucide-react";
import type { ElementType } from "react";

export type Program = {
  slug: string;
  title: string;
  icon: ElementType;
  imageId: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  ctaText: string;
  href: string;
  details: {
    title: string;
    description: string;
  }[];
};

export const programs: Program[] = [
    {
      slug: "family-support-and-education",
      title: "Family Support & Education",
      tagline: "FROM STRUGGLE TO SCHOOL.",
      icon: GraduationCap,
      imageId: "program-education",
      shortDescription: "We identify families crushed by poverty and provide school fees, scholastic materials, emergency food assistance, and connection to sustainable opportunities. Education isn't a privilege. It's a right. We make it accessible.",
      longDescription: "Our foundation is built on the belief that education is the most powerful tool for breaking the cycle of poverty. We work within communities to identify children at risk of dropping out of school due to financial hardship. We don't just provide a one-time handout; we build a relationship with the family, understanding their unique challenges and providing holistic support. This includes not only covering school fees but also ensuring the child has the uniform, books, and meals they need to learn effectively and with dignity. Our goal is to create a stable environment where a child's only job is to learn and dream.",
      ctaText: "See Families We've Helped",
      href: "/story-hub",
      details: [
        {
          title: "Direct School Fee Payments",
          description: "We pay fees directly to the school to ensure accountability and prevent diversion of funds."
        },
        {
          title: "Scholastic Material Provision",
          description: "We provide complete kits with uniforms, shoes, backpacks, books, and stationery."
        },
        {
          title: "Emergency Family Support",
          description: "For families in our program, we offer support for urgent needs like food or medical bills to prevent crises from derailing a child's education."
        },
        {
          title: "Mentorship and Monitoring",
          description: "We regularly check in on the student's academic progress and well-being, acting as a support system for both the child and the school."
        }
      ]
    },
    {
      slug: "arts-and-culture-promotion",
      title: "Arts & Culture Promotion",
      tagline: "AMPLIFYING THE UNHEARD.",
      icon: Palette,
      imageId: "program-arts",
      shortDescription: "Uganda is rich with talent buried by poverty and lack of platforms. We spotlight underground musicians, painters, dancers, poets, traditional craftspeople, and young creatives with world-class talent but zero visibility. We don't just promote art. We preserve culture. We create careers.",
      longDescription: "Art is the soul of our culture, but countless talented individuals lack the platform to turn their passion into a profession. Our Arts & Culture Promotion initiative is designed to discover and amplify these hidden gems. We use our digital platforms and network to connect artists with a global audience. We document their creative process, tell their stories with dignity, and provide them with the tools and connections needed to build a sustainable career. This isn't just about exposure; it's about creating economic empowerment through cultural expression and ensuring that our vibrant arts scene thrives.",
      ctaText: "See Our Artists",
      href: "/shop",
      details: [
        {
          title: "Artist Spotlights",
          description: "We create professional video and photo content to showcase an artist's work and story on our large social media platforms."
        },
        {
          title: "Marketplace Creation",
          description: "We feature artists' work in our 'Shop for a Cause', providing a direct-to-market link for them to sell their creations."
        },
        {
          title: "Skills Training",
          description: "We offer workshops on basic business management, social media marketing, and financial literacy for artists."
        },
        {
          title: "Event Curation",
          description: "We organize showcases and market events to connect artists directly with buyers, gallery owners, and the public."
        }
      ]
    },
    {
      slug: "community-storytelling",
      title: "Community Storytelling",
      tagline: "TURNING STORIES INTO POWER.",
      icon: BookOpen,
      imageId: "program-storytelling",
      shortDescription: "Every documentary we create serves to give a voice to the voiceless and attract resources to solve real problems. We document family struggles, community solutions, and cultural traditions before they're lost. Authentic. Unfiltered. Impactful.",
      longDescription: "We believe that the most powerful tool for change is a true story, told with dignity. Our Community Storytelling program is the engine of our foundation. We go into communities and listen. We create short, powerful documentaries that highlight not just the struggles, but also the resilience, innovation, and beauty of the Ugandan people. These films are not for exploitation; they are for connection. They serve to educate a global audience, break down stereotypes, and attract the resources needed to fund the solutions that these communities already envision.",
      ctaText: "Watch Our Films",
      href: "/videos",
      details: [
        {
          title: "Documentary Production",
          description: "We produce high-quality short films about our beneficiaries, programs, and broader cultural topics."
        },
        {
          title: "Oral History Preservation",
          description: "We sit with community elders to record their memories, traditions, and wisdom, creating an invaluable archive for future generations."
        },
        {
          title: "Advocacy Campaigns",
          description: "We use our stories to raise awareness about specific issues, from period poverty to the need for educational resources."
        },
        {
          title: "Impact Reporting",
          description: "We close the loop by creating follow-up stories that show our donors the direct impact of their contributions."
        }
      ]
    },
    {
      slug: "youth-empowerment",
      title: "Youth Empowerment",
      tagline: "BUILDING THE NEXT GENERATION.",
      icon: BrainCircuit,
      imageId: "program-youth",
      shortDescription: "We don't just help youth—we equip them. Our programs include digital literacy training, mentorship from successful Ugandans, life skills, and pathways to employment and entrepreneurship. Today's struggling youth are tomorrow's community leaders.",
      longDescription: "The future of Uganda rests in the hands of its youth. Our Youth Empowerment program is designed to equip them with the skills and confidence they need to become tomorrow's leaders. We move beyond traditional education to provide practical, real-world training that is directly applicable to the modern economy. By pairing skills training with mentorship and life skills, we provide a holistic support system that prepares young people not just for a job, but for a successful and impactful life.",
      ctaText: "Join as a Mentor",
      href: "/volunteer",
      details: [
        {
          title: "Digital Literacy & Content Creation",
          description: "A 3-month course teaching photography, videography, social media management, and basic web design."
        },
        {
          title: "Mentorship Matching",
          description: "We connect youth with successful Ugandan professionals in their field of interest for guidance and networking."
        },
        {
          title: "Life Skills Workshops",
          description: "We cover essential topics like financial literacy, public speaking, CV writing, and interview preparation."
        },
        {
          title: "Entrepreneurship Support",
          description: "For promising youth with business ideas, we provide seed funding and guidance to help them launch their own ventures."
        }
      ]
    }
];

export const programsMap = new Map(programs.map(p => [p.slug, p]));

export function getAllPrograms(): Program[] {
    return programs;
}
  
export function getProgramBySlug(slug: string): Program | undefined {
    return programs.find(p => p.slug === slug);
}
