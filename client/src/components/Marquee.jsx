import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:3001/posts";

const Marquee = () => {
  const [marqueeText, setMarqueeText] = useState(
    "⚠️ BREAKING NEWS: Stay tuned for the latest updates..."
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestMarquee = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch posts"); 

        const posts = await res.json();

        // Filter active posts and sort by uploadedDate descending
        const activePosts = posts
          .filter((p) => p.status === "active")
          .sort((a, b) => {
            const dateA = new Date(`${a.uploadedDate}T${a.uploadedTime || "00:00"}`);
            const dateB = new Date(`${b.uploadedDate}T${b.uploadedTime || "00:00"}`);
            return dateB - dateA;
          });

        // Get the latest post with a marqueeText
        const latestWithMarquee = activePosts.find((p) => p.marqueeText?.trim());
        if (latestWithMarquee) {
          setMarqueeText(latestWithMarquee.marqueeText);
        }
      } catch (err) {
        console.error("Error fetching marquee:", err);
        // Keep default text
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMarquee();
  }, []);

  // Duplicate text for seamless loop
  const items = [marqueeText, marqueeText, marqueeText, marqueeText];

  if (loading) {
    return (
      <div className="relative w-full bg-linear-to-r from-[#cc0000] via-[#ff0000] to-[#cc0000] border-y-2 border-red-700 shadow-lg overflow-hidden">
        <div className="flex items-center py-4 px-4 text-white font-bold">
          Loading marquee...
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-linear-to-r from-[#cc0000] via-[#ff0000] to-[#cc0000] border-y-2 border-red-700 shadow-lg overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ pointerEvents: "none" }}
      />

      {/* Live Badge */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 bg-black/80 text-white px-3 py-1.5 rounded-full shadow-lg">
        <motion.span
          className="relative flex h-3 w-3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </motion.span>
        <span className="text-xs font-bold tracking-widest">LIVE</span>
      </div>

      {/* Scrolling Content */}
      <motion.div
        className="flex items-center py-4 pl-24 pr-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {items.map((text, index) => (
          <span
            key={index}
            className="text-white font-bold tracking-wide text-sm sm:text-base md:text-lg flex items-center gap-6 mx-8"
          >
            <span className="inline-block w-2 h-2 bg-white/70 rounded-full shrink-0"></span>
            {text}
          </span>
        ))}
      </motion.div>

      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 h-full w-8 bg-linear-to-r from-[#ff0000] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-8 bg-linear-to-l from-[#ff0000] to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Marquee;