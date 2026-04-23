import React from 'react'
import { motion } from "framer-motion"
import {
  Zap,
  Code2,
  Database,
  Mail,
  QrCode,
  Package,
} from "lucide-react";

const TechAbout = () => {

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

  return (
    <section style={{ paddingBlock: "5rem" }}>
      <div
        className="max-w-sm md:max-w-2xl lg:max-w-5xl px-6"
        style={{ margin: "0 auto" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold capitalize"
          style={{ color: "var(--ink)", marginBottom: "1.5rem" }}
        >
          Built with modern technologies
        </motion.h2>

        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100%,1fr))",
            gap: "2rem", // FIX gap
          }}
        >
          {stack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border shadow-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                padding: "1.25rem",
              }}
            >
              <h3
                className="font-bold"
                style={{ color: "var(--ink)", marginBottom: "0.25rem" }}
              >
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
  );
}

export default TechAbout