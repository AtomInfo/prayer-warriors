import { useQuery } from "@tanstack/react-query";
import { Clock, BookOpen, HandHelping, Music } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Service } from "@shared/schema";

export default function ServiceTimes() {
  const { data: sundayServices, isLoading: loadingSunday } = useQuery<Service[]>({
    queryKey: ['/api/services/type/Sunday'],
  });

  const { data: weekdayServices, isLoading: loadingWeekday } = useQuery<Service[]>({
    queryKey: ['/api/services/type/Weekday'],
  });

  const isLoading = loadingSunday || loadingWeekday;

  // Define icons mapping
  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes("Bible")) return <BookOpen />;
    if (serviceName.includes("Prayer")) return <HandHelping />;
    if (serviceName.includes("Choir")) return <Music />;
    return <Clock />;
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-6">Join Us in Worship</h2>
            <p className="font-opensans text-lg text-[#333333]">Weekly services and opportunities to connect with our community.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Sunday Services</h3>
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="h-10 w-10 rounded-full mr-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  {sundayServices?.map((service) => (
                    <li key={service.id} className="flex items-start">
                      <div className="bg-accent text-white rounded-full p-2 mr-4">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-opensans font-semibold text-lg">{service.name}</h4>
                        <p className="text-[#333333]">{service.startTime} - {service.endTime}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Weekday Activities</h3>
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start">
                      <Skeleton className="h-10 w-10 rounded-full mr-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-4">
                  {weekdayServices?.map((service) => (
                    <li key={service.id} className="flex items-start">
                      <div className="bg-accent text-white rounded-full p-2 mr-4">
                        {getServiceIcon(service.name)}
                      </div>
                      <div>
                        <h4 className="font-opensans font-semibold text-lg">{service.name}</h4>
                        <p className="text-[#333333]">{service.day}, {service.startTime} - {service.endTime}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
