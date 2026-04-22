import React, { useRef, } from "react";
import { Ticket, QrCode, Calendar, ArrowUpRight } from "lucide-react"
import { motion, useTransform, useScroll } from "framer-motion"
import { Link } from "react-router-dom"

const HeroHome = () => {

    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
      target: heroRef,
      offset: ["start start", "end start"],
    });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-16 overflow-hidden"
      style={{ paddingLeft: "1.5rem" }}
    >
      {/* Left text column */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 max-w-3xl pt-20 pb-32 gap-8"
      >
        {/* Eyebrow line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div
            className="h-px w-12"
            style={{ backgroundColor: "var(--brand)" }}
          />
          <span
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--brand)" }}
          >
            Momentis Platform
          </span>
        </motion.div>

        {/* Oversized stacked headline */}
        <div className="mb-10">
          {["Register.", "Attend.", "Remember."].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block font-bold leading-[0.95] tracking-tight"
                style={{
                  fontSize: "clamp(52px, 9vw, 112px)",
                  color: i === 1 ? "var(--brand)" : "var(--ink)",
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Description + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start gap-8 my-8"
        >
          <p
            className="text-base leading-relaxed max-w-xs"
            style={{ color: "var(--muted)" }}
          >
            End-to-end event registration — browse, register, receive your QR
            ticket, and get scanned in at the door.
          </p>
          <div className="flex flex-col gap-3 shrink-0">
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-full text-sm"
                style={{ backgroundColor: "var(--brand)" }}
              >
                Browse Events <ArrowUpRight size={15} />
              </motion.button>
            </Link>
            <Link to="/ticket-lookup">
              <button
                className="flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full border transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                }}
              >
                <Ticket size={14} /> My Ticket
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Right decorative panel — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hidden lg:block absolute top-0 right-0 w-[44%] h-full"
        style={{
          backgroundColor: "var(--bg-alt)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        {/* Watermark letter */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span
            className="font-bold leading-none rotate-12"
            style={{
              fontSize: "280px",
              color: "var(--brand)",
              opacity: 0.06,
            }}
          >
            M
          </span>
        </div>

        {/* Floating ticket card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-72"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="p-5"
              style={{ backgroundColor: "var(--brand)", padding: "5px" }}
            >
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                Your Ticket
              </p>
              <p className="text-white font-bold text-lg leading-tight">
                Tech Summit 2025
              </p>
              <p className="text-white/70 text-xs mt-1 flex items-center gap-1.5">
                <Calendar size={11} /> Aug 10 · Lagos Tech Hub
              </p>
            </div>
            {/* Dashed tear line */}
            <div className="flex items-center px-0 my-0">
              <div
                className="w-5 h-5 rounded-full shrink-0 -ml-2.5"
                style={{ backgroundColor: "var(--bg-alt)" }}
              />
              <div
                className="flex-1 border-t-2 border-dashed"
                style={{ borderColor: "var(--border)" }}
              />
              <div
                className="w-5 h-5 rounded-full shrink-0 -mr-2.5"
                style={{ backgroundColor: "var(--bg-alt)" }}
              />
            </div>
            <div
              className="p-5 flex items-center justify-between"
              style={{ paddingLeft: "5px" }}
            >
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "var(--muted)" }}
                >
                  Code
                </p>
                <p
                  className="font-bold font-mono tracking-widest text-lg"
                  style={{ color: "var(--ink)" }}
                >
                  AB12-CD34
                </p>
              </div>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "var(--brand-muted)" }}
              >
                <QrCode size={28} style={{ color: "var(--brand)" }} />
              </div>
            </div>
          </motion.div>
          {/* Shadow card */}
          <div
            className="absolute -bottom-3 left-4 right-4 h-full rounded-2xl -z-10"
            style={{ backgroundColor: "var(--brand)", opacity: 0.15 }}
          />
        </motion.div>

        {/* Mini notification badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-24 right-10 rounded-2xl px-4 py-3 shadow-lg"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-xs font-semibold mb-0.5"
            style={{ color: "var(--muted)" }}
          >
            Just registered
          </p>
          <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
            Amara O. ✓
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroHome;
