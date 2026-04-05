import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Story from "./components/Story";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import Countdown from "./components/Countdown";
import RSVP from "./components/RSVP";
import Gifting from "./components/Gifting";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import FallingHearts from "./components/FallingHearts";
import TikTokStream from "./components/TikTokStream";

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
        <Hero />
        <Story />
        <EventDetails />
        <Countdown />
        <Gallery />
        <RSVP />
        <Gifting />
        <Footer />
      </div>

      {/* Box Overlay Floating giới hạn trong 430px luôn trên màn hình */}
      <div className="fixed inset-0 z-[60] flex justify-center pointer-events-none">
         <div className="relative w-full max-w-[430px] pointer-events-none">
            <MusicPlayer />
            <TikTokStream />
         </div>
      </div>
    </div>
  );
}

export default App;
