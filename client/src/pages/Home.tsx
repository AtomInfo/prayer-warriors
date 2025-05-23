import Hero from "@/components/home/Hero";
import WelcomeMessage from "@/components/home/WelcomeMessage";
import ServiceTimes from "@/components/home/ServiceTimes";
import AboutSection from "@/components/home/AboutSection";
import Events from "@/components/home/Events";
import Sermons from "@/components/home/Sermons";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import CallToAction from "@/components/home/CallToAction";
import { useEffect } from "react";

export default function Home() {
  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target && target.hash && target.pathname === location.pathname) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div>
      <Hero />
      <WelcomeMessage />
      <ServiceTimes />
      <AboutSection />
      <Events />
      <Sermons />
      <Testimonials />
      <Contact />
      <CallToAction />
    </div>
  );
}
