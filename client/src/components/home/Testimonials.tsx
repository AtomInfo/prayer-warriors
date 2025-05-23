import { useQuery } from "@tanstack/react-query";
import { QuoteIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-6 text-white">Our Community</h2>
          <p className="font-opensans text-lg max-w-3xl mx-auto text-white">
            Hear from members of our congregation about their experiences at Prayer Warriors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white bg-opacity-10 p-8 rounded-lg">
                <Skeleton className="h-10 w-10 bg-gray-400 mb-4" />
                <Skeleton className="h-24 w-full bg-gray-400 mb-8" />
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full bg-gray-400 mr-4" />
                  <div>
                    <Skeleton className="h-5 w-32 bg-gray-400 mb-1" />
                    <Skeleton className="h-4 w-24 bg-gray-400" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            testimonials?.map((testimonial) => (
              <div key={testimonial.id} className="bg-white bg-opacity-10 p-8 rounded-lg">
                <div className="text-secondary text-4xl mb-4">
                  <QuoteIcon className="h-10 w-10" />
                </div>
                <p className="font-opensans text-lg mb-8 text-white">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent mr-4 flex items-center justify-center">
                    <span className="font-playfair font-bold text-xl text-white">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-opensans font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">Member since {testimonial.memberSince}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
