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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
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

  const wasInterruptedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleGalleryState = (e) => setIsGalleryOpen(e.detail);
    window.addEventListener("gallery-state", handleGalleryState);
    return () =>
      window.removeEventListener("gallery-state", handleGalleryState);
  }, []);

  useEffect(() => {
    const handleGlobalPlay = (e) => {
      if (e.detail !== "main-music") {
        if (resumeTimeoutRef.current) {
          clearTimeout(resumeTimeoutRef.current);
          resumeTimeoutRef.current = null;
        }
        setIsPlaying((prev) => {
          if (prev) {
            audioRef.current?.pause();
            wasInterruptedRef.current = true;
            return false;
          }
          return prev;
        });
      }
    };

    const handleGlobalPause = (e) => {
      if (e.detail !== "main-music") {
        if (wasInterruptedRef.current) {
          resumeTimeoutRef.current = setTimeout(() => {
            if (wasInterruptedRef.current) {
              audioRef.current?.play().catch((err) => console.log(err));
              setIsPlaying(true);
              wasInterruptedRef.current = false;
            }
          }, 3000);
        }
      }
    };

    window.addEventListener("global-play", handleGlobalPlay);
    window.addEventListener("global-pause", handleGlobalPause);
    return () => {
      window.removeEventListener("global-play", handleGlobalPlay);
      window.removeEventListener("global-pause", handleGlobalPause);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      wasInterruptedRef.current = false;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    } else {
      window.dispatchEvent(
        new CustomEvent("global-play", { detail: "main-music" }),
      );
      wasInterruptedRef.current = false;
      audioRef.current
        .play()
        .catch((err) => console.log("Playback blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`absolute flex flex-col items-center transition-all duration-500 pointer-events-auto ${isGalleryOpen ? "top-6 left-6 z-[120]" : "top-4 right-4 z-[60]"}`}
    >
      {" "}
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
        className={`bg-white/80 backdrop-blur-md shadow-lg p-2 rounded-full ${isPlaying ? "text-[#1b3a68]" : "text-gray-400"} hover:bg-white transition-all flex items-center justify-center border border-[#1b3a68]/20 z-10 pointer-events-auto`}
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
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b3a68] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1b3a68]"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
