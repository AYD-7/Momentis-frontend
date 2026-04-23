import React from 'react'
import { motion } from "framer-motion"

const WorksAbout = () => {
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
    
  return (
    <section
      style={{
        paddingBlock: "5rem",
        backgroundColor: "var(--bg-alt)",
      }}
    >
      <div
        className="max-w-sm md:max-w-2xl lg:max-w-5xl px-6"
        style={{ margin: "0 auto" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold capitalize"
          style={{ color: "var(--ink)", marginBottom: "2rem" }}
        >
          How it works
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border-b pb-6"
              style={{ borderColor: "var(--border)" }}
            >
              <h3
                className="font-semibold text-lg"
                style={{ color: "var(--ink)", marginBottom: "0.25rem" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorksAbout