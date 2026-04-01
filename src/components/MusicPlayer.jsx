import React, { useState, useRef, useEffect } from "react";
import { Pause, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import musicFile from "../assets/nhacnen.m4a";

const MusicNote = ({ id, onComplete }) => {
  const notes = ["♪", "♫", "♬", "♩"];
  const note = notes[Math.floor(Math.random() * notes.length)];
  const randomX = Math.random() * 60 - 30; // -30 to 30

  return (
    <motion.span
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: -100,
        x: randomX,
        scale: [0.5, 1.2, 1, 0.8],
        rotate: [0, 15, -15, 0],
      }}
      transition={{ duration: 3, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(id)}
      className="absolute text-wedding-gold pointer-events-none text-lg select-none z-0"
    >
      {note}
    </motion.span>
  );
};

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // Spawning notes loop
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        const id = Date.now();
        setNotes((prev) => [...prev.slice(-10), id]); // Keep last 10 notes to avoid memory leak
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const removeNote = (id) => {
    setNotes((prev) => prev.filter((noteId) => noteId !== id));
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.log("Playback blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-10 lg:right-10 z-50 flex flex-col items-center">
      <audio ref={audioRef} src={musicFile} loop playsInline preload="auto" />

      {/* Floating Notes Container */}
      <div className="relative w-full h-0 flex justify-center">
        <AnimatePresence>
          {notes.map((id) => (
            <MusicNote key={id} id={id} onComplete={removeNote} />
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`bg-white/80 backdrop-blur-md shadow-lg p-3.5 rounded-full ${isPlaying ? "text-wedding-gold" : "text-gray-400"} hover:bg-white transition-all flex items-center justify-center border border-wedding-gold/20 z-10`}
        aria-label="Toggle music"
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Pause size={20} />
          </motion.div>
        ) : (
          <Music size={20} />
        )}

        {isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wedding-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-wedding-gold"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
