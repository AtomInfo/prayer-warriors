import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/#services" },
    { name: "Events", path: "/events" },
    { name: "Sermons", path: "/sermons" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <header className="relative bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-primary font-playfair font-bold text-2xl">
              Prayer Warriors
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`font-opensans font-semibold transition-colors ${
                  isActive(link.path) ? "text-primary" : "text-[#333333] hover:text-primary"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-secondary text-white hover:bg-opacity-90">
              Donate
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="text-primary"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "text-primary bg-gray-50"
                    : "text-[#333333] hover:text-primary hover:bg-gray-50"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full justify-center mt-2 bg-secondary text-white hover:bg-opacity-90">
              Donate
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
