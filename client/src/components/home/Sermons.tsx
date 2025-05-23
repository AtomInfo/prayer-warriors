import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Download } from "lucide-react";
import { Sermon } from "@shared/schema";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Sermons() {
  const { data: sermons, isLoading } = useQuery<Sermon[]>({
    queryKey: ['/api/sermons'],
  });

  return (
    <section id="sermons" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-primary mb-6">Recent Sermons</h2>
          <p className="font-opensans text-lg text-[#333333] max-w-3xl mx-auto">
            Listen to our latest messages and grow in your faith journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <Skeleton className="h-64 w-full" />
                <div className="p-6 bg-white space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            sermons?.slice(0, 3).map((sermon) => (
              <div key={sermon.id} className="sermon-item relative rounded-lg overflow-hidden shadow-lg group">
                <img 
                  src={sermon.imageUrl} 
                  alt={sermon.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="sermon-overlay absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                  <Button 
                    className="bg-secondary text-white rounded-full p-4 hover:bg-opacity-90 transition-colors"
                    aria-label="Play sermon"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-2">{sermon.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {sermon.speaker} • {format(new Date(sermon.date), "MMMM d, yyyy")}
                  </p>
                  <p className="font-opensans text-[#333333] mb-4 line-clamp-2">
                    {sermon.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link href={`/sermons/${sermon.id}`} className="text-primary font-semibold hover:text-secondary transition-colors">
                      Listen Now
                    </Link>
                    <a 
                      href={sermon.audioUrl} 
                      download 
                      className="text-primary hover:text-secondary transition-colors"
                      aria-label="Download sermon"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/sermons">
            <Button className="bg-secondary text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-opacity-90 transition-colors">
              Browse All Sermons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
