import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  return (
    <section id="events" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-primary mb-6">Upcoming Events</h2>
          <p className="font-opensans text-lg text-[#333333] max-w-3xl mx-auto">
            Join us for these special gatherings and celebrations as we come together in faith and fellowship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))
          ) : (
            events?.slice(0, 3).map((event) => {
              const eventDate = new Date(event.date);
              const day = format(eventDate, "dd");
              const month = format(eventDate, "MMMM");

              return (
                <div key={event.id} className="event-card bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-primary flex items-center justify-center">
                    <div className="text-center text-white">
                      <span className="block font-playfair text-5xl font-bold">{day}</span>
                      <span className="block font-opensans uppercase tracking-wider">{month}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-primary mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {event.startTime} - {event.endTime}
                    </p>
                    <p className="text-sm text-gray-500 mb-4 flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </p>
                    <p className="font-opensans text-[#333333] mb-6">{event.description}</p>
                    <Link href={`/events/${event.id}`} className="text-primary font-semibold hover:text-secondary transition-colors flex items-center">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/events">
            <Button className="bg-secondary text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-opacity-90 transition-colors">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
