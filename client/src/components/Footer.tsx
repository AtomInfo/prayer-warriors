import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4 text-white">Prayer Warriors</h3>
            <p className="font-opensans mb-6 text-white">A welcoming place to grow in faith and community.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="font-opensans space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/sermons" className="text-gray-300 hover:text-white transition-colors">Sermons</Link></li>
              <li><Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4 text-white">Service Times</h3>
            <ul className="font-opensans space-y-2 text-white">
              <li>Sunday: 9:00 AM, 11:00 AM, 6:00 PM</li>
              <li>Wednesday Bible Study: 7:00 PM</li>
              <li>Youth Group: Friday 6:30 PM</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4 text-white">Contact Information</h3>
            <ul className="font-opensans space-y-2 text-white">
              <li className="flex items-start">
                <span className="mr-2">📍</span> 
                <span>Ntinda</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span> 
                <span>(256) 706 428 097</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span> 
                <span>info.prayerwarriors@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="font-opensans text-gray-400">&copy; {new Date().getFullYear()} Prayer Warriors. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
