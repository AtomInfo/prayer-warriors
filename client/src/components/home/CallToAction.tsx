import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CallToAction() {
  return (
    <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600')" }}>
      <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
      <div className="container relative mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-playfair text-4xl font-bold mb-6 text-white">Join Our Community</h2>
          <p className="font-opensans text-xl mb-8 text-white">
            We welcome you to become part of our church family. Experience the joy of worship, fellowship, and growing in faith together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="#services">
              <Button className="bg-secondary text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-opacity-90 transition-colors text-center">
                Visit This Sunday
              </Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-white hover:text-primary transition-colors text-center">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
