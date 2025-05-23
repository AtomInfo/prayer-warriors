import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { InsertContactMessage } from "@shared/schema";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: InsertContactMessage) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-primary mb-6">Contact Us</h2>
          <p className="font-opensans text-lg text-[#333333] max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with any questions or to learn more about our church.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-6">Send a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-opensans font-semibold text-[#333333]">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-opensans font-semibold text-[#333333]">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-opensans font-semibold text-[#333333]">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-opensans font-semibold text-[#333333]">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={5} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-secondary text-white px-6 py-3 rounded-md font-opensans font-semibold hover:bg-opacity-90 transition-colors w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-6">Church Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-secondary mr-4 mt-1">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-opensans font-semibold text-lg">Location</h4>
                    <p className="text-[#333333]">Ntinda</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary mr-4 mt-1">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-opensans font-semibold text-lg">Phone</h4>
                    <p className="text-[#333333]">(256) 706 428 097</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary mr-4 mt-1">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-opensans font-semibold text-lg">Email</h4>
                    <p className="text-[#333333]">info.prayerwarriors@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-secondary mr-4 mt-1">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-opensans font-semibold text-lg">Office Hours</h4>
                    <p className="text-[#333333]">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: Closed<br />
                      Sunday: 8:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden h-64">
              {/* This would typically be a map component in a real implementation */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-primary mb-2 mx-auto" />
                  <p className="font-opensans text-[#333333]">Interactive Map Would Appear Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
