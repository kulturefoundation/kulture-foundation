
import { Palette, GraduationCap, BookOpen, Users } from "lucide-react";
import type { ElementType } from "react";

export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  category: "Workshop" | "Showcase" | "Community" | "Fundraiser";
  icon: ElementType;
  buttonText: string;
  actionType: "register" | "nominate" | "link";
  href?: string;
  imageId: string;
};

const events: Event[] = [
  {
    id: "1",
    slug: "kampala-youth-workshop-dec-2024",
    title: "Kampala Youth Workshop",
    description: "Skills training for aspiring content creators.",
    longDescription: "Join us for a full-day, hands-on workshop designed to equip young Ugandans (ages 16-24) with practical skills in digital content creation. Learn photography, videography, and social media management from industry professionals. This is a unique opportunity to kickstart your career in the digital age. Lunch will be provided.",
    date: "December 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Kampala",
    address: "National Theatre, De Winton Road, Kampala",
    category: "Workshop",
    icon: GraduationCap,
    buttonText: "Register Now",
    actionType: "register",
    imageId: "event-workshop",
  },
  {
    id: "2",
    slug: "artist-showcase-market-dec-2024",
    title: "Artist Showcase & Market",
    description: "Platform for local artists to sell and network.",
    longDescription: "Discover and purchase unique art directly from Uganda's most promising underground artists. Our showcase features a curated selection of painters, sculptors, and craftspeople. It's the perfect opportunity to find a unique piece for your home while supporting local talent. A percentage of all sales supports the Kulture Foundation's Arts & Culture fund.",
    date: "December 20, 2024",
    time: "12:00 PM - 8:00 PM",
    location: "Entebbe",
    address: "Entebbe Botanical Gardens",
    category: "Showcase",
    icon: Palette,
    buttonText: "Nominate an Artist",
    actionType: "nominate",
    imageId: "event-showcase",
  },
  {
    id: "3",
    slug: "community-storytelling-circle-jan-2025",
    title: "Community Storytelling Circle",
    description: "Share your story. Be heard. Be documented.",
    longDescription: "We believe every voice matters. Join us for an open and welcoming storytelling circle where community members can share their personal histories, family tales, and cultural knowledge. Selected stories will be professionally documented for our digital archive, preserving them for future generations. Your story is part of Uganda's history.",
    date: "January 05, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Jinja",
    address: "Jinja Town Hall",
    category: "Community",
    icon: BookOpen,
    buttonText: "Join the Circle",
    actionType: "link",
    href: "/story-hub#share-story",
    imageId: "story-village",
  },
  {
    id: "4",
    slug: "family-support-drive-jan-2025",
    title: "Family Support Drive",
    description: "Help us provide school materials for 50 children.",
    longDescription: "Our annual back-to-school drive is critical for ensuring children can start the new school year with everything they need. We're raising funds to provide 50 children from low-income families with a complete kit including a backpack, notebooks, pens, and a uniform. Your donation, no matter the size, makes a direct difference.",
    date: "Campaign Ends Jan 12, 2025",
    time: "Online",
    location: "Online",
    category: "Fundraiser",
    icon: Users,
    buttonText: "Donate Now",
    actionType: "link",
    href: "/causes/school-supplies-for-100-children",
    imageId: "cause-school",
  }
];

export function getAllEvents(): Event[] {
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}
