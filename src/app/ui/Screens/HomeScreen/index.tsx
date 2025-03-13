import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
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