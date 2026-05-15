import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/config/navigation";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import AudienceSection from "@/components/landing/AudienceSection";
import LevelsSection from "@/components/landing/LevelsSection";
import MethodSection from "@/components/landing/MethodSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import CertificateSection from "@/components/landing/CertificateSection";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => scrollToSection(location.hash), 100);
    }
  }, [location]);

  return (
  <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <AudienceSection />
    <LevelsSection />
    <MethodSection />
    <WhyChooseSection />
    <CertificateSection />
    <CTASection />
    {/* <ContactSection /> */}
    <Footer />
  </>
  );
};

export default Index;
