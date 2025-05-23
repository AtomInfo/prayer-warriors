import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Event } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Calendar, ChevronLeft, Share2 } from "lucide-react";
import { format } from "date-fns";

export default function EventDetail() {
  const { id } = useParams();
  const eventId = parseInt(id);

  const { data: event, isLoading, error } = useQuery<Event>({
    queryKey: [`/api/events/${eventId}`],
    enabled: !isNaN(eventId),
  });

  if (isNaN(eventId)) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-primary mb-4">Invalid Event ID</h1>
          <p className="font-opensans text-lg text-[#333333] mb-6">The event ID provided is not valid.</p>
          <Link href="/events">
            <Button className="bg-secondary text-white">View All Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-primary mb-4">Event Not Found</h1>
          <p className="font-opensans text-lg text-[#333333] mb-6">The event you're looking for could not be found.</p>
          <Link href="/events">
            <Button className="bg-secondary text-white">View All Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <Link href="/events">
            <Button variant="link" className="pl-0 flex items-center text-primary">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Events
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-12 w-3/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        ) : event ? (
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="h-64 bg-primary flex items-center justify-center">
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-white">
                    <Calendar className="h-16 w-16 mx-auto mb-4" />
                    <span className="block font-playfair text-5xl font-bold">
                      {format(new Date(event.date), "dd")}
                    </span>
                    <span className="block font-opensans uppercase tracking-wider">
                      {format(new Date(event.date), "MMMM yyyy")}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <h1 className="font-playfair text-4xl font-bold text-primary mb-6">{event.title}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="bg-accent text-white rounded-full p-2 mr-4">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-opensans font-semibold text-lg">Date</h4>
                      <p className="text-[#333333]">{format(new Date(event.date), "MMMM d, yyyy")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="bg-accent text-white rounded-full p-2 mr-4">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-opensans font-semibold text-lg">Time</h4>
                      <p className="text-[#333333]">{event.startTime} - {event.endTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="bg-accent text-white rounded-full p-2 mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-opensans font-semibold text-lg">Location</h4>
                      <p className="text-[#333333]">{event.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="prose max-w-none mb-8">
                  <h2 className="font-playfair text-2xl font-bold text-primary mb-4">Event Details</h2>
                  <p className="font-opensans text-lg text-[#333333]">{event.description}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Button className="bg-secondary text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-opacity-90 transition-colors">
                    Register for Event
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
