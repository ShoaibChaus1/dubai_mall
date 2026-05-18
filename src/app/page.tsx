import Preloader from "@/components/Preloader";
import IntroVideo from "@/components/IntroVideo";
import Navbar from "@/components/layout/Navbar";
import CursorGlow from "@/components/ui/CursorGlow";
import Hero from "@/components/hero/Hero";
import Scale from "@/components/sections/Scale";
import Retail from "@/components/sections/Retail";
import Luxury from "@/components/sections/Luxury";
import Dining from "@/components/sections/Dining";
import Entertainment from "@/components/sections/Entertainment";
import Events from "@/components/sections/Events";
import Conversion from "@/components/sections/Conversion";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen bg-black">
      <Preloader />
      <IntroVideo />
      <Navbar />
      <CursorGlow />
      <Hero />
      <Scale />
      <Retail />
      <Luxury />
      <Dining />
      <Entertainment />
      <Events />
      <Conversion />
    </main>
  );
}


