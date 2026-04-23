import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Code2,
  Database,
  Mail,
  QrCode,
  ArrowRight,
  Globe,
  Package,
} from "lucide-react";



const stack = [
  {
    icon: Code2,
    name: "Node.js + Express",
    desc: "REST API backend with clean MVC architecture and ES Modules.",
  },
  {
    icon: Database,
    name: "MongoDB + Mongoose",
    desc: "NoSQL database with schema validation and typed documents.",
  },
  {
    icon: Mail,
    name: "Nodemailer + Gmail",
    desc: "HTML confirmation emails with QR code attachments via SMTP.",
  },
  {
    icon: QrCode,
    name: "QRCode.js",
    desc: "Dynamic QR code generation per ticket, encoded as base64 PNG.",
  },
  {
    icon: Zap,
    name: "React + TypeScript",
    desc: "Strongly typed frontend with Vite for fast development.",
  },
  {
    icon: Package,
    name: "Tailwind + Framer",
    desc: "CSS variables for theming, smooth animations throughout.",
  },
];

const endpoints = [
  { method: "GET", path: "/api/events", desc: "List all events" },
  { method: "GET", path: "/api/events/:id", desc: "Get one event" },
  { method: "POST", path: "/api/events", desc: "Create event (admin)" },
  { method: "POST", path: "/api/registrations", desc: "Register for event" },
  { method: "GET", path: "/api/registrations/:id", desc: "View registration" },
  {
    method: "PATCH",
    path: "/api/registrations/:id/cancel",
    desc: "Cancel registration",
  },
  { method: "GET", path: "/api/tickets/:code", desc: "Look up a ticket" },
  {
    method: "POST",
    path: "/api/tickets/validate/:code",
    desc: "Validate at gate",
  },
  {
    method: "GET",
    path: "/api/admin/events",
    desc: "Admin: all events + stats",
  },
  {
    method: "GET",
    path: "/api/admin/events/:id/registrations",
    desc: "Admin: registrant list",
  },
];

const methodColor: Record<string, string> = {
  GET: "bg-green-500/20 text-green-400",
  POST: "bg-blue-500/20 text-blue-400",
  PATCH: "bg-yellow-500/20 text-yellow-400",
};

const timeline = [
  {
    phase: "Phase 1",
    title: "Backend API",
    desc: "Built Node/Express REST API with all endpoints for events, registrations, and tickets using ES Modules.",
  },
  {
    phase: "Phase 2",
    title: "Database",
    desc: "Designed MongoDB schemas with relationships between Events, Registrations, and Tickets.",
  },
  {
    phase: "Phase 3",
    title: "Email System",
    desc: "Integrated Nodemailer with Gmail SMTP to send HTML emails with attached QR codes.",
  },
  {
    phase: "Phase 4",
    title: "Frontend",
    desc: "Built this React + TypeScript UI with Tailwind CSS, dark mode, and Framer Motion animations.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Hero */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: "var(--brand)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Zap size={14} fill="currentColor" /> Capstone Project
            </span>
            <h1 className="font-bold text-5xl md:text-6xl text-white mb-6 leading-tight">
              About Momentis
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              A full-stack event registration system covering the entire
              lifecycle — from event creation to QR ticket validation at the
              gate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-20" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--brand)" }}
              >
                The Project
              </p>
              <h2
                className="font-bold text-4xl mb-5 leading-tight"
                style={{ color: "var(--ink)" }}
              >
                A complete event platform in one capstone
              </h2>
              <p
                className="leading-relaxed mb-4"
                style={{ color: "var(--muted)" }}
              >
                Momentis simulates the core flow of real event platforms. It
                handles registration, confirmation emails, unique QR-coded
                tickets, and gate validation — all end-to-end.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
                Backend: Node.js + Express + MongoDB using ES Modules. Frontend:
                React + TypeScript with Tailwind CSS and dark mode support.
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { label: "API Endpoints", value: "10+" },
                { label: "Database Collections", value: "3" },
                { label: "Frontend Pages", value: "6" },
                { label: "Email Confirmation", value: "Yes ✓" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-xl border px-5 py-4"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="font-bold text-xl"
                    style={{ color: "var(--brand)" }}
                  >
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20" style={{ backgroundColor: "var(--bg-alt)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--brand)" }}
            >
              Stack
            </p>
            <h2 className="font-bold text-4xl" style={{ color: "var(--ink)" }}>
              Technologies used
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border p-5 transition-all hover:shadow-md"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--brand-muted)" }}
                >
                  <tech.icon size={18} style={{ color: "var(--brand)" }} />
                </div>
                <h3 className="font-bold mb-1" style={{ color: "var(--ink)" }}>
                  {tech.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--brand)" }}
            >
              Process
            </p>
            <h2 className="font-bold text-4xl" style={{ color: "var(--ink)" }}>
              How it was built
            </h2>
          </motion.div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ backgroundColor: "var(--brand)" }}
                  >
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && (
                    <div
                      className="w-0.5 flex-1 mt-2"
                      style={{ backgroundColor: "var(--border)" }}
                    />
                  )}
                </div>
                <div className="pt-2 pb-6">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--brand)" }}
                  >
                    {item.phase}
                  </span>
                  <h3
                    className="font-bold text-lg mt-1 mb-2"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API endpoints */}
      <section className="py-20" style={{ backgroundColor: "var(--brand)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              API
            </p>
            <h2 className="font-bold text-4xl text-white">
              Endpoints at a glance
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {endpoints.map((ep, i) => (
              <motion.div
                key={ep.path}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3 border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                <span
                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded shrink-0 ${methodColor[ep.method]}`}
                >
                  {ep.method}
                </span>
                <span className="text-white/60 font-mono text-xs truncate">
                  {ep.path}
                </span>
                <span className="text-white/40 text-xs ml-auto shrink-0 hidden sm:block">
                  {ep.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-bold text-4xl mb-4"
              style={{ color: "var(--ink)" }}
            >
              Ready to try it out?
            </h2>
            <p className="mb-8" style={{ color: "var(--muted)" }}>
              Browse the available events and register for one to see the full
              flow in action.
            </p>
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full"
                style={{ backgroundColor: "var(--brand)" }}
              >
                Browse Events <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
