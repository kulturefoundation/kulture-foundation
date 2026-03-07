"use client";

import * as React from "react";
import { CartProvider } from "@/context/cart-context";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { Toaster } from "@/components/ui/toaster";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { DonationAlert } from "@/components/donation-alert";
import { PwaInstallPrompt } from "@/components/pwa-install-prompt";
import BackToTopButton from "@/components/back-to-top";
import { FirebaseErrorListener } from "@/lib/errors";

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch errors by only rendering children once mounted
    if (!mounted) {
        return null;
    }

    return (
        <FirebaseClientProvider>
            <CartProvider>
                <FirebaseErrorListener />
                {children}
                <Toaster />
                <NewsletterPopup />
                <DonationAlert />
                <PwaInstallPrompt />
                <BackToTopButton />
            </CartProvider>
        </FirebaseClientProvider>
    );
}
