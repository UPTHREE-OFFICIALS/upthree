import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkSection from "@/components/sections/WorkSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
export default function Page() {
  return <><Navbar /><main><HeroSection /><WorkSection /><ServicesSection /><ProcessSection /><ContactSection /><FAQSection /></main><Footer /></>;
}
