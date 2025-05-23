import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Sermon } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, Download, Share2, Play } from "lucide-react";
import { format } from "date-fns";
import SermonPlayer from "@/components/ui/sermon-player";

export default function SermonDetail() {
  const { id } = useParams();
  const sermonId = parseInt(id);

  const { data: sermon, isLoading, error } = useQuery<Sermon>({
    queryKey: [`/api/sermons/${sermonId}`],
    enabled: !isNaN(sermonId),
  });

  if (isNaN(sermonId)) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-primary mb-4">Invalid Sermon ID</h1>
          <p className="font-opensans text-lg text-[#333333] mb-6">The sermon ID provided is not valid.</p>
          <Link href="/sermons">
            <Button className="bg-secondary text-white">Browse All Sermons</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-primary mb-4">Sermon Not Found</h1>
          <p className="font-opensans text-lg text-[#333333] mb-6">The sermon you're looking for could not be found.</p>
          <Link href="/sermons">
            <Button className="bg-secondary text-white">Browse All Sermons</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <Link href="/sermons">
            <Button variant="link" className="pl-0 flex items-center text-primary">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Sermons
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : sermon ? (
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-80 bg-primary">
                {sermon.imageUrl ? (
                  <img src={sermon.imageUrl} alt={sermon.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary">
                    <Play className="h-24 w-24 text-white opacity-25" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Button className="bg-secondary text-white rounded-full p-8 hover:bg-opacity-90 transition-colors">
                    <Play className="h-12 w-12" />
                  </Button>
                </div>
              </div>
              
              <div className="p-8">
                <h1 className="font-playfair text-4xl font-bold text-primary mb-3">{sermon.title}</h1>
                <p className="text-gray-500 text-lg mb-6">
                  {sermon.speaker} • {format(new Date(sermon.date), "MMMM d, yyyy")}
                </p>
                
                <SermonPlayer audioUrl={sermon.audioUrl} title={sermon.title} className="mb-8" />
                
                <div className="prose max-w-none mb-8">
                  <h2 className="font-playfair text-2xl font-bold text-primary mb-4">Sermon Description</h2>
                  <p className="font-opensans text-lg text-[#333333]">{sermon.description}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <a 
                    href={sermon.audioUrl} 
                    download 
                    className="bg-secondary text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download Sermon
                  </a>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Sermon
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
