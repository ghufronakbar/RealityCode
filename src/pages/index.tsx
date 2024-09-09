import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/section/AboutSection";
import ContactSection from "@/components/section/ContactSection";
import FeaturesSection from "@/components/section/FeaturesSection";
import HeroSection from "@/components/section/HeroSection";
import TestimonialsSection from "@/components/section/TestimonialsSection";

export default function Home() {
  return (
    <>
      <main className="bg-white dark:bg-black min-h-screen text-white font-archivo overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
