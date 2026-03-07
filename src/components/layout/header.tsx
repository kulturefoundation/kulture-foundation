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
import { Menu, BookHeart, Wind, Heart, ShoppingCart, Info, Users, GalleryHorizontal, Calendar, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { CartContext } from "@/context/cart-context";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SearchDialog } from "../search-dialog";
import * as React from "react";

const aboutLinks = [
  { title: "Our Story", href: "/about", icon: Info, description: "Learn about the story behind 256 Estates Foundation." },
  { title: "Meet the Team", href: "/about#team", icon: Users, description: "The passionate individuals driving our mission." },
];

const communityLinks = [
    { title: "Story Hub", href: "/story-hub", icon: BookHeart, description: "Read the real stories of impact." },
    { title: "Events", href: "/events", icon: Calendar, description: "Join our workshops and gatherings." },
    { title: "Gallery", href: "/gallery", icon: GalleryHorizontal, description: "Explore visual stories of change." },
];

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)} {...props}>
          <div className="flex items-center gap-3">
             <div className="bg-primary/10 text-primary p-2 rounded-md"><Icon className="h-5 w-5" /></div>
             <div>
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
             </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <>
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled || !isHome ? "bg-background/95 backdrop-blur-sm shadow-md border-b" : "bg-transparent")}>
      <div className="container flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          {logoImage ? (
             <Image src={logoImage.imageUrl} alt="256 Estates Foundation Logo" width={56} height={56} className="bg-transparent" />
          ) : (
            <Logo className="h-12 w-12 text-primary" />
          )}
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-bold text-foreground font-headline leading-none uppercase">256 Estates</span>
            <span className="text-xs text-foreground/80 tracking-widest leading-none uppercase">Foundation</span>
          </div>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn((scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {aboutLinks.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>{item.description}</ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/programs" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), (scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>Programs</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/causes" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), (scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>Causes</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn((scrolled || !isHome) ? "bg-transparent" : "bg-transparent text-white hover:bg-white/10")}>Community</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {communityLinks.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>{item.description}</ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className={cn((scrolled || !isHome) ? "text-foreground" : "text-white")}>
                <Search className="h-5 w-5" />
            </Button>
            <Button asChild className="hidden sm:inline-flex">
                <Link href="/donate">Donate</Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className={cn((scrolled || !isHome) ? "text-foreground" : "text-white")}>
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5"/>
                    {isClient && cartItemCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{cartItemCount}</span>}
                </Link>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className={cn("lg:hidden", (scrolled || !isHome) ? "text-foreground" : "text-white")}>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-0">
                    <div className="p-6 pt-12 flex flex-col h-full overflow-y-auto">
                        <Button asChild className="mt-8 w-full"><Link href="/donate">Donate Now</Link></Button>
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
