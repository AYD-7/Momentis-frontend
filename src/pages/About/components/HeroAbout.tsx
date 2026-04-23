import React from 'react'
import { motion } from "framer-motion"

const HeroAbout = () => {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        backgroundColor: "var(--brand)",
        paddingBlock: "5rem", // FIX spacing here
      }}
    >
      <div className="mx-auto max-w-4xl px-6" style={{ margin: "0 auto" }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-white leading-tight"
          style={{ fontSize: "clamp(40px,6vw,64px)" }}
        >
          About Momentis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-lg leading-relaxed"
          style={{ marginTop: "1rem" }}
        >
          A full-stack event platform that simplifies discovery, registration,
          and access using QR-based tickets.
        </motion.p>
      </div>
    </section>
  );
}

export default HeroAbout