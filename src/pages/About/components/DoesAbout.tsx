import React from 'react'
import { motion } from "framer-motion"

const DoesAbout = () => {
  return (
    <section
      style={{ paddingBlock: "5rem" }} // override spacing
    >
      <div
        className="max-w-sm md:max-w-2xl lg:max-w-5xl px-6"
        style={{ margin: "0 auto" }} // fix mx-auto
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold capitalize"
          style={{ color: "var(--ink)", marginBottom: "1rem" }}
        >
          What this platform does
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="leading-relaxed mb-4"
          style={{ color: "var(--muted)" }}
        >
          Momentis manages the full lifecycle of an event — from browsing to
          registration and secure entry.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Every ticket includes a unique QR code that is validated in real time
          at the venue.
        </motion.p>
      </div>
    </section>
  );
}

export default DoesAbout