
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

// Define the interface for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PwaInstallPrompt() {
  const { toast } = useToast();
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
      
      // Check if the app is already installed to avoid showing the prompt unnecessarily.
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone) {
         showInstallPromptToast(event as BeforeInstallPromptEvent);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showInstallPromptToast = (event: BeforeInstallPromptEvent) => {
    toast({
      title: "Install Kulture Foundation App",
      description: "Get a better experience by installing our app on your device.",
      duration: 10000, // Keep the toast open for 10 seconds
      action: (
        <Button onClick={() => handleInstallClick(event)}>
          <Download className="mr-2 h-4 w-4" />
          Install
        </Button>
      ),
    });
  }

  const handleInstallClick = (event: BeforeInstallPromptEvent | null) => {
    if (!event) {
      return;
    }
    // Show the browser's install prompt.
    event.prompt();

    // Wait for the user to respond to the prompt.
    event.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // Clear the saved prompt event.
      setInstallPromptEvent(null);
    });
  };
  
  // This component doesn't render anything itself, it just handles the logic.
  return null;
}
 
