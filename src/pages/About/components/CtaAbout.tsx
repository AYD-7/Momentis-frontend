import React from 'react'
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const CtaAbout = () => {
  return (
    <section
      className="border-t"
      style={{ paddingBlock: "5rem", borderColor: "var(--border)" }}
    >
      <div
        className="text-center px-6"
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
          style={{ color: "var(--ink)", marginBottom: "0.25rem" }}
        >
          Try it yourself
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-8"
          style={{ color: "var(--muted)", marginBottom: "2rem" }}
        >
          Explore events and experience the full flow.
        </motion.p>

        <Link to="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Browse Events <ArrowRight size={18} />
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

export default CtaAbout