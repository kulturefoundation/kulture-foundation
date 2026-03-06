
"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Menu, BookHeart, Map, Rss, HandHeart, Wind, Heart, ShoppingCart, LogOut, LayoutDashboard, Info, Users, GalleryHorizontal, Film, Calendar, HelpCircle, Droplets, Mic, Briefcase, Newspaper, Search, ChevronDown, BookAudio } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { CartContext } from "@/context/cart-context";
import { useUser } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SearchDialog } from "../search-dialog";
import * as React from "react";


const aboutLinks: { title: string; href: string; description: string, icon: React.ElementType }[] = [
  {
    title: "Our Story",
    href: "/about",
    icon: Info,
    description: "Learn about our mission, vision, and the story behind 256 Estates Foundation.",
  },
  {
    title: "Meet the Team",
    href: "/about#team",
    icon: Users,
    description: "The passionate individuals driving our mission forward.",
  },
   {
    title: "Careers",
    href: "/careers",
    icon: Briefcase,
    description: "Join our team and help us make a difference.",
  },
  {
    title: "FAQ",
    href: "/faq",
    icon: HelpCircle,
    description: "Find answers to common questions about our work.",
  },
];

const communityLinks: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
        title: "Story Hub",
        href: "/story-hub",
        icon: BookHeart,
        description: "Read the real stories of the lives you are changing."
    },
    {
        title: "Events",
        href: "/events",
        icon: Calendar,
        description: "Join us for our upcoming workshops and gatherings."
    },
    {
        title: "Blog",
        href: "/blog",
        icon: Rss,
        description: "Updates and insights from our team in the field."
    },
    {
        title: "Gallery",
        href: "/gallery",
        icon: GalleryHorizontal,
        description: "Explore visual stories of our impact."
    },
    {
        title: "Volunteer",
        href: "/volunteer",
        icon: HandHeart,
        description: "Lend your skills to make a difference."
    },
]

const mediaHubLinks: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
        title: "Videos",
        href: "/videos",
        icon: Film,
        description: "Watch our collection of short films."
    },
    {
        title: "Audio Books",
        href: "/podcasts",
        icon: BookAudio,
        description: "Tune in for deep conversations on culture and impact."
    },
    {
        title: "Tours & Travel",
        href: "/map",
        icon: Map,
        description: "Explore Uganda's cultural sites with our guide.",
    },
     {
        title: "Media Kit",
        href: "/mediakit",
        icon: Newspaper,
        description: "Official resources for press and media."
    }
]

const getInvolvedLinks: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
        title: "Donate",
        href: "/donate",
        icon: Heart,
        description: "Your gift fuels our mission."
    },
     {
        title: "Sponsor a Child",
        href: "/sponsorship",
        icon: Users,
        description: "Change a child's life forever."
    },
    {
        title: "Shop for a Cause",
        href: "/shop",
        icon: ShoppingCart,
        description: "Every purchase directly supports our programs."
    }
]

const mobileNavStructure = [
    { type: 'link' as const, href: "/about", title: "About Us", icon: Info },
    { type: 'link' as const, href: "/programs", title: "Programs", icon: Wind },
    { type: 'link' as const, href: "/causes", title: "Causes", icon: Heart },
    { type: 'link' as const, href: "/kulture-pads", title: "Kulture Pads", icon: Droplets },
    {
      type: 'group' as const,
      title: 'Community',
      icon: Users,
      links: communityLinks.map(l => ({ href: l.href, title: l.title, icon: l.icon }))
    },
    { 
      type: 'group' as const,
      title: 'Get Involved',
      icon: HandHeart,
      links: getInvolvedLinks.map(l => ({ href: l.href, title: l.title, icon: l.icon }))
    },
    { 
      type: 'group' as const,
      title: 'Media Hub',
      icon: Film,
      links: mediaHubLinks.map(l => ({ href: l.href, title: l.title, icon: l.icon }))
    },
    { type: 'link' as const, href: "/faq", title: "FAQ", icon: HelpCircle },
];


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
             <div className="bg-primary/10 text-primary p-2 rounded-md">
                <Icon className="h-5 w-5" />
             </div>
             <div>
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
             </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


function UserNav() {
  const { user, isUserLoading } = useUser();
  const auth = getAuth();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (isUserLoading) {
    return <div className="h-10 w-24 rounded-md bg-gray-200 animate-pulse" />;
  }

  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL!} alt={user.displayName!} />
            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
           </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useContext(CartContext);
  const logoImage = PlaceHolderImages.find((p) => p.id === 'kulture-foundation-logo');
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            setIsSearchOpen(true);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    handleScroll(); // Set initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener('keydown', handleKeyDown);
    }
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome ? "bg-background/95 backdrop-blur-sm shadow-md border-b" : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          {logoImage ? (
             <Image src={logoImage.imageUrl} alt="256 Estates Foundation Logo" width={56} height={56} className="bg-transparent" />
          ) : (
            <Logo className="h-12 w-12 text-primary" />
          )}
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-bold text-foreground font-headline leading-none">256 ESTATES</span>
            <span className="text-xs text-foreground/80 tracking-widest leading-none">FOUNDATION</span>
          </div>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn((scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {aboutLinks.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <Link href="/programs" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), (scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>
                        Programs
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/causes" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), (scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>
                        Causes
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <Link href="/kulture-pads" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), (scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>
                        Kulture Pads
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <NavigationMenuTrigger className={cn((scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>Community</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {communityLinks.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn((scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>Get Involved</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {getInvolvedLinks.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <NavigationMenuTrigger className={cn((scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>Media Hub</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {mediaHubLinks.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
          <Button asChild>
            <Link href="/donate">Donate</Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5"/>
              {isClient && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          {isClient && <UserNav />}
        </div>
        <div className="lg:hidden flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className={cn((scrolled || !isHome) ? "text-foreground" : "text-white")}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
          <Button asChild variant="ghost" size="icon" className={cn((scrolled || !isHome) ? "text-foreground" : "text-white")}>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5"/>
              {isClient && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
               <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn((scrolled || !isHome) ? "text-foreground" : "text-white")}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background p-0">
               <div className="p-6 pt-12 flex flex-col h-full overflow-y-auto">
                <Accordion type="multiple" className="w-full">
                  {mobileNavStructure.map((item) =>
                    item.type === 'link' ? (
                      <SheetClose key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="flex items-center gap-4 border-b py-4 text-lg font-medium text-muted-foreground hover:text-primary"
                        >
                          <item.icon className="h-5 w-5" />
                          {item.title}
                        </Link>
                      </SheetClose>
                    ) : (
                      <AccordionItem key={item.title} value={item.title}>
                        <AccordionTrigger className="flex w-full items-center gap-4 py-4 text-lg font-medium text-muted-foreground hover:text-primary hover:no-underline [&>svg]:ml-auto">
                           <item.icon className="h-5 w-5" />
                           {item.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4">
                            {item.links.map(subLink => (
                               <SheetClose key={subLink.title} asChild>
                                <Link
                                  href={subLink.href}
                                  className="flex items-center gap-4 border-b py-4 text-base font-medium text-muted-foreground/80 hover:text-primary"
                                >
                                  <subLink.icon className="h-5 w-5" />
                                  {subLink.title}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
                <div className="mt-auto pt-6">
                    <SheetClose asChild>
                        <Button asChild className="w-full">
                            <Link href="/donate">Donate Now</Link>
                        </Button>
                    </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    <SearchDialog isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
