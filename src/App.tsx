import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import SplitScroll from "./components/SplitScroll";
import TrustedBy from "./components/TrustedBy";
import FeaturedWork from "./components/FeaturedWork";
import Audience from "./components/Audience";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introDone && <Intro key="intro" onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <SplitScroll />
        <TrustedBy />
        <FeaturedWork />
        <Audience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
