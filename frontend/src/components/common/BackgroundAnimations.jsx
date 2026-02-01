import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Butterfly = ({ delay, startX, startY }) => (
  <motion.div
    initial={{ x: startX, y: startY, scale: 0, opacity: 0 }}
    animate={{
      x: [startX, startX + 100, startX + 200, startX + 300, startX + 400],
      y: [startY, startY - 50, startY + 20, startY - 80, startY - 150],
      scale: [0, 1, 1, 1, 0],
      opacity: [0, 1, 1, 1, 0],
      rotate: [0, 15, -10, 20, 0]
    }}
    transition={{
      duration: 15,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 10,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none z-0"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C12 12 8 6 2 8C2 8 5 12 8 14C8 14 3 18 2 22C2 22 8 20 12 16C12 16 16 20 22 22C22 22 21 18 16 14C16 14 19 12 22 8C22 8 16 6 12 12Z" fill="#f97316" fillOpacity="0.6" />
    </svg>
  </motion.div>
);

const Leaf = ({ delay, duration, xStart, scale, color }) => (
  <motion.div
    initial={{ y: -50, x: xStart, opacity: 0, rotate: 0 }}
    animate={{
      y: '110vh',
      x: [xStart, xStart + 50, xStart - 50, xStart + 20, xStart],
      opacity: [0, 0.6, 0.6, 0],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute top-0 pointer-events-none z-0"
  >
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `scale(${scale})` }}>
      <path d="M12 21C12 21 13.5 16.5 18 13.5C22.5 10.5 21 4.5 21 4.5C21 4.5 15 3 12 7.5C9 3 3 4.5 3 4.5C3 4.5 1.5 10.5 6 13.5C10.5 16.5 12 21 12 21Z" fill={color} fillOpacity="0.4"/>
    </svg>
  </motion.div>
);

const Pollen = ({ delay, xStart, yStart }) => (
  <motion.div
    initial={{ x: xStart, y: yStart, opacity: 0 }}
    animate={{
      y: yStart + 100,
      x: xStart + (Math.random() * 50 - 25),
      opacity: [0, 0.5, 0],
    }}
    transition={{
      duration: 5 + Math.random() * 5,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute w-1 h-1 bg-yellow-200 rounded-full pointer-events-none z-0 blur-[1px]"
  />
);

const BackgroundAnimations = () => {
  const [leaves, setLeaves] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [pollen, setPollen] = useState([]);

  useEffect(() => {
    // Leaves
    const leafCount = 8;
    setLeaves(Array.from({ length: leafCount }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      xStart: Math.random() * window.innerWidth,
      scale: 0.6 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? '#86efac' : '#1a4d36', // accent or secondary-light
    })));

    // Butterflies
    const butterflyCount = 4;
    setButterflies(Array.from({ length: butterflyCount }).map((_, i) => ({
      id: i,
      delay: Math.random() * 20,
      startX: Math.random() * (window.innerWidth - 200),
      startY: window.innerHeight - (Math.random() * 300),
    })));

    // Pollen
    const pollenCount = 15;
    setPollen(Array.from({ length: pollenCount }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      xStart: Math.random() * window.innerWidth,
      yStart: Math.random() * window.innerHeight,
    })));

  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Overlay for warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 pointer-events-none" />

      {leaves.map((item) => (
        <Leaf key={`leaf-${item.id}`} {...item} />
      ))}

      {butterflies.map((item) => (
        <Butterfly key={`bf-${item.id}`} {...item} />
      ))}

      {pollen.map((item) => (
        <Pollen key={`pl-${item.id}`} {...item} />
      ))}
      
      {/* Corner Vines - Static but gently breathing */}
      <motion.div 
        animate={{ scale: [1, 1.02, 1], rotate: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-10 opacity-10 text-secondary"
      >
         <svg width="300" height="300" viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 100 Q 20 50 50 50 T 100 0" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="50" r="5" />
            <circle cx="20" cy="80" r="3" />
            <circle cx="80" cy="20" r="4" />
         </svg>
      </motion.div>
    </div>
  );
};

export default BackgroundAnimations;
