
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { EventRegistrationDialog } from "@/components/event-registration-dialog";
import { ArtistNominationDialog } from "@/components/artist-nomination-dialog";
import { useState } from "react";
import Link from "next/link";
import { getAllEvents, type Event } from "@/lib/events-data";

export default function Events() {
  const [registrationEvent, setRegistrationEvent] = useState<Event | null>(null);
  const [nominationEvent, setNominationEvent] = useState<Event | null>(null);
  
  const events = getAllEvents().slice(0, 4); // Show the next 4 events on the homepage

  const handleButtonClick = (event: Event) => {
    if (event.actionType === 'register') {
      setRegistrationEvent(event);
    } else if (event.actionType === 'nominate') {
      setNominationEvent(event);
    }
  };

  return (
    <section id="events" className="py-24 sm:py-32 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Upcoming Events & Programs</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Join us in celebrating culture, education, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => {
            const eventImage = PlaceHolderImages.find(p => p.id === event.imageId);
            
            return (
              <Card key={event.id} className="overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card flex flex-col">
                {eventImage && (
                    <div className="relative h-56 w-full">
                        <Image
                        src={eventImage.imageUrl}
                        alt={event.title}
                        fill
                        data-ai-hint={eventImage.imageHint}
                        className="object-cover"
                        />
                   </div>
                )}
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2 leading-snug uppercase">{event.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm flex-1">{event.description}</p>
                   <div className="flex flex-col text-sm text-muted-foreground mb-6 space-y-2">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {event.date}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {event.location}</span>
                  </div>
                  
                  {event.actionType === 'link' ? (
                    <Button asChild variant="outline" className="w-full hover:bg-accent hover:text-white border-accent text-accent">
                      <Link href={event.href || '#'}>{event.buttonText}</Link>
                    </Button>
                  ) : (
                    <Button 
                        variant="outline" 
                        className="w-full hover:bg-accent hover:text-white border-accent text-accent" 
                        onClick={() => handleButtonClick(event)}
                        disabled
                    >
                        {event.buttonText}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
         <div className="text-center mt-16">
            <Button asChild size="lg">
                <Link href="/events">View All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
      </div>
      <EventRegistrationDialog
        event={registrationEvent}
        isOpen={!!registrationEvent}
        onClose={() => setRegistrationEvent(null)}
      />
      <ArtistNominationDialog
        event={nominationEvent}
        isOpen={!!nominationEvent}
        onClose={() => setNominationEvent(null)}
      />
    </section>
  );
}
 
