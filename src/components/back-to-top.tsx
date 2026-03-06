
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      size="icon"
      className={cn(
        "fixed bottom-24 right-6 h-14 w-14 rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-opacity hover:bg-primary hover:scale-105 z-40",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
 
