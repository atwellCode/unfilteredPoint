import React from "react";
import { motion } from "framer-motion";

// Import all 12 images from assets
import img1 from "../assets/n-c-1.png";
import img2 from "../assets/n-c-2.png";
import img3 from "../assets/n-c-3.png";
import img4 from "../assets/n-c-4.png";
import img5 from "../assets/n-c-5.png";
import img6 from "../assets/n-c-6.png";
import img7 from "../assets/n-c-7.png";
import img8 from "../assets/n-c-8.png";
import img9 from "../assets/n-c-9.png";
import img10 from "../assets/n-c-10.png";
import img11 from "../assets/n-c-11.png";
import img12 from "../assets/n-c-12.png";

const newsImages = [
  img1, img2, img3, img4, img5, img6,
  img7, img8, img9, img10, img11, img12,
];

const NewsMarquee = () => {
  // Duplicate the array to create a seamless loop
  const allImages = [...newsImages, ...newsImages];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-[#ff0000] border-y border-[#ff0000]/30 py-4 overflow-hidden relative"
    >
      {/* Gradient overlays for smooth fade edges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute left-0 top-0 h-full w-35 bg-gradient-to-r from-[#ff0000] to-transparent z-10 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute right-0 top-0 h-full w-35 bg-gradient-to-l from-[#ff0000] to-transparent z-10 pointer-events-none"
      />

      {/* Scrolling container */}
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
        style={{ width: "fit-content" }}
      >
        {allImages.map((image, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={image}
              alt={`News channel logo ${index + 1}`}
              className="h-16 md:h-20 w-auto object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
              style={{ maxWidth: "120px" }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NewsMarquee;