import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container relative mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-white">Welcome to Prayer Warriors</h1>
          <p className="font-opensans text-xl mb-8 text-white">Join us as we grow together in faith, hope, and love. Services every Sunday at 9:00 AM and 11:00 AM.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="#services">
              <Button className="bg-secondary text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-opacity-90 transition-colors text-center">
                Service Times
              </Button>
            </Link>
            <Link href="#about">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-opensans font-semibold hover:bg-white hover:text-primary transition-colors text-center">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
