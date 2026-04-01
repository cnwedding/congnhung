import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Story from "./components/Story";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import Countdown from "./components/Countdown";
import RSVP from "./components/RSVP";
import Gifting from "./components/Gifting";
import Guestbook from "./components/Guestbook";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import FallingHearts from "./components/FallingHearts";

function App() {
  useEffect(() => {
    // Clear hash if it exists to prevent browser jumping
    if (window.location.hash) {
      window.history.replaceState(
        "",
        document.title,
        window.location.pathname + window.location.search,
      );
    }

    // Tiny delay to override browser's scroll restoration
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex justify-center w-full">
      <FallingHearts />
      <div className="w-full max-w-[430px] bg-white/20 overflow-hidden relative ">
        <MusicPlayer />
        <Hero />
        <Story />
        <EventDetails />
        <Countdown />
        <Gallery />
        <Guestbook />
        <RSVP />
        <Gifting />
        <Footer />
      </div>
    </div>
  );
}

export default App;
