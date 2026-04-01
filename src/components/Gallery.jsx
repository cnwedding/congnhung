import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import anh1 from "../assets/album/anh1.webp";
import anh2 from "../assets/album/anh2.webp";
import anh3 from "../assets/album/anh3.webp";
import anh4 from "../assets/album/anh4.webp";
import anh5 from "../assets/album/anh5.webp";
import anh6 from "../assets/album/anh6.webp";
import anh7 from "../assets/album/anh7.webp";
import anh8 from "../assets/album/anh8.webp";
import anh9 from "../assets/album/anh9.webp";
import anh91 from "../assets/album/anh91.webp";
import anh92 from "../assets/album/anh92.webp";
import anh94 from "../assets/album/anh94.webp";
import anh95 from "../assets/album/anh95.webp";
import anh96 from "../assets/album/anh96.webp";
import anh97 from "../assets/album/anh97.webp";

const images = [
  anh1,
  anh2,
  anh5,
  anh4,
  anh3,
  anh6,
  anh7,
  anh8,
  anh9,
  anh91,
  anh92,
  anh94,
  anh95,
  anh96,
  anh97,
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [scale, setScale] = useState(1);
  const [lastDist, setLastDist] = useState(0);

  // Reset scale when image changes or closes
  React.useEffect(() => {
    setScale(1);
  }, [selectedIndex]);

  const handleWheel = (e) => {
    if (selectedIndex === null) return;
    const delta = e.deltaY;
    setScale((prev) => {
      const newScale = prev - delta * 0.002; // Slower zoom
      return Math.min(Math.max(newScale, 1), 4);
    });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      setLastDist(dist);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      if (lastDist > 0) {
        const delta = dist - lastDist;
        setScale((prev) => {
          const newScale = prev + delta * 0.01;
          return Math.min(Math.max(newScale, 1), 4);
        });
      }
      setLastDist(dist);
    }
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="gallery"
      className="py-10 px-0 relative z-10 w-full text-center"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-titleSection font-nvnvalky text-[#1b3a68] mb-2 uppercase tracking-widest"
        >
          Album Cưới
        </motion.h2>
        <div className="w-12 h-px bg-[#1b3a68] mx-auto opacity-30 mt-4"></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative cursor-pointer group overflow-hidden rounded-xl ${
              index === 0
                ? "col-span-2 aspect-[2/3]"
                : "col-span-1 aspect-[2/3]"
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={src}
              alt={`Kỷ niệm ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1b3a68]/10 transition-colors duration-500"></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-4 touch-none"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] p-3 bg-white/10 backdrop-blur-md rounded-full"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              className="hidden md:flex absolute left-6 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[110]"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>
            <button
              className="hidden md:flex absolute right-6 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[110]"
              onClick={nextImage}
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag={scale === 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (scale > 1) return;
                const swipe =
                  Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 500;
                if (swipe && offset.x > 0) {
                  prevImage();
                } else if (swipe && offset.x < 0) {
                  nextImage();
                }
              }}
              className="w-full h-full flex items-center justify-center pointer-events-auto touch-none overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setLastDist(0)}
            >
              <motion.img
                src={images[selectedIndex]}
                alt="Phóng to"
                animate={{
                  scale,
                  x: scale === 1 ? 0 : undefined,
                  y: scale === 1 ? 0 : undefined,
                }}
                drag={scale > 1}
                dragConstraints={{
                  left: -1000,
                  right: 1000,
                  top: -1000,
                  bottom: 1000,
                }}
                dragElastic={0.1}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.5,
                }}
                className={`max-w-full max-h-[85vh] object-contain select-none shadow-2xl origin-center ${scale > 1 ? "pointer-events-auto cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
              />
            </motion.div>

            {/* Pagination indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-widest font-light">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
