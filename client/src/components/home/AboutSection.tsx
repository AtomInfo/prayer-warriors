import { Heart, HelpingHand, BookOpen, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Church community gathering" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-6">Our History & Mission</h2>
            <p className="font-opensans text-lg mb-6 text-[#333333]">
              Founded in 2023, Prayer Warriors began as a vision to create a devoted community of believers committed to the power of prayer. 
              What started as a small prayer group has quickly grown into a vibrant congregation united in faith and purpose.
            </p>
            <p className="font-opensans text-lg mb-8 text-[#333333]">
              Our mission is to harness the transformative power of prayer, creating a sanctuary where believers can strengthen their 
              spiritual connection, support one another through intercession, and extend God's healing touch to our community and beyond.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="text-secondary mr-4">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-opensans font-semibold text-lg">Love</h4>
                  <p className="text-[#333333]">Embracing everyone with compassion and understanding</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-secondary mr-4">
                  <HelpingHand className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-opensans font-semibold text-lg">Serve</h4>
                  <p className="text-[#333333]">Reaching out to our community with helping hands</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-secondary mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-opensans font-semibold text-lg">Learn</h4>
                  <p className="text-[#333333]">Deepening our understanding of God's word</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-secondary mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-opensans font-semibold text-lg">Community</h4>
                  <p className="text-[#333333]">Building meaningful connections with one another</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
