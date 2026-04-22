import React from "react";
import { motion } from "framer-motion"


const MarqueeStrip = () => {
  //  Marquee content
  const marqueeItems = [
    "Register in seconds",
    "QR Code Tickets",
    "Email Confirmation",
    "No Overbooking",
    "Gate Validation",
    "Free Cancellation",
  ];
  const items = [...marqueeItems, ...marqueeItems];
  
  return (
    <div
      className="overflow-hidden h-8 py-5 border-y flex"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--brand)" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-1"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-8 text-sm font-semibold text-white/90 uppercase tracking-widest"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};;

export default MarqueeStrip;
