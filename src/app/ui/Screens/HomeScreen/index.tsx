import { About } from "@/components/About";
import { Cta } from "@/components/Cta";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Pricing } from "@/components/Pricing";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import { Sponsors } from "@/components/Sponsors";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesHomeScreen } from "./FeaturesHomeScrre";
import { Studies } from "./Studies";

export function HomeScreen(){
    return(    
      <>
      <Navbar />
      <Hero />
      <FeaturesHomeScreen/>
      <Studies/>
      <Cta />
      <HowItWorks />
      <ScrollToTop /> 
      <Footer />
      {/* 
      <Sponsors />
      <About />
      <Features />
      <Team />
      <Services />
      <Testimonials />
      <Pricing />
      <Newsletter />
      */}

    </>
    )
}