import React from 'react'
import { Link } from "react-router-dom";
import { motion, } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTAHome = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--brand)",
        paddingBlock: "5rem",
        paddingInline: "1rem",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.06,
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-bold text-white"
          style={{
            fontSize: "clamp(100px,18vw,280px)",
            opacity: 0.04,
            whiteSpace: "nowrap",
          }}
        >
          MOMENTIS
        </span>
      </div>

      <div
        className="relative z-10 max-w-6xl mx-auto px-6"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          marginInline: "auto",
        }}
      >
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between"
          style={{ gap: "40px" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]"
            >
              Don't miss out
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-bold text-white leading-none"
              style={{ fontSize: "clamp(40px,6vw,88px)" }}
            >
              Your next
              <br />
              great event
              <br />
              is one click
              <br />
              away.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "flex-start",
            }}
          >
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 bg-white font-bold rounded-full text-base hover:shadow-xl transition-all"
                style={{
                  color: "var(--brand)",
                  padding: "16px 32px",
                }}
              >
                Browse all events <ArrowRight size={18} />
              </motion.button>
            </Link>

            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
              Free to register · Tickets by email
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTAHome