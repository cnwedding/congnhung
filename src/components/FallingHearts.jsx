import React from "react";
import { motion } from "framer-motion";

const Heart = ({ x, size, duration, opacity, onComplete }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0.1 }}
      animate={{
        y: "105vh",
        opacity: [0.2, opacity, opacity, 0.2],
        x: [0, 20, -20, 0],
        rotate: [0, 45, -45, 0],
      }}
      transition={{
        duration: duration,
        ease: "linear",
      }}
      onAnimationComplete={onComplete}
      className="fixed pointer-events-none z-50 text-red-400"
      style={{ left: x + "%" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

export default function FallingHearts() {
  const [hearts, setHearts] = React.useState([]);

  React.useEffect(() => {
    const addHeart = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const newHeart = {
        id,
        x: Math.random() * 100,
        size: (Math.random() * 10 + 14).toString(),
        duration: Math.random() * 5 + 8, // 8-13s
        opacity: Math.random() * 0.4 + 0.4,
      };
      setHearts((prev) => [...prev, newHeart]);
    };

    // Initial spawn
    addHeart();

    // Spawn every 2 seconds
    const interval = setInterval(addHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  const removeHeart = (id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          {...heart}
          onComplete={() => removeHeart(heart.id)}
        />
      ))}
    </div>
  );
}
