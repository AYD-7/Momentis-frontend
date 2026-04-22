import React from 'react'
import { motion } from "framer-motion"
import {
  Zap,
  Shield,
  Mail,
  QrCode,
  Users,
} from "lucide-react";

const FeaturesHome = () => {
  return (
    <section
      className="overflow-hidden"
      style={{
        backgroundColor: "var(--bg-alt)",
        paddingBlock: "5rem",
        paddingInline: "1.5rem",
      }}
    >
      <div
        className="max-w-6xl lg:max-w-full mx-auto px-6"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--brand)" }}
          >
            Features
          </p>

          <h2
            className="font-bold leading-tight"
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              color: "var(--ink)",
            }}
          >
            Built for the
            <br />
            whole experience
          </h2>
        </motion.div>

        {/* Grid wrapper */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-6xl"
          style={{ gap: "16px", marginInline: "auto" }}
        >
          {/* Wide feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-3xl border flex flex-col md:flex-row items-center text-center lg:text-start"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              padding: "32px",
              gap: "32px",
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--brand)",
              }}
            >
              <Mail size={40} className="text-white" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3
                className="font-bold text-2xl"
                style={{ color: "var(--ink)" }}
              >
                Instant email confirmation
              </h3>

              <p
                className="leading-relaxed max-w-xl"
                style={{ color: "var(--muted)" }}
              >
                The moment you register, a beautifully formatted confirmation
                lands in your inbox — event details, your unique ticket code,
                and a scannable QR code you can show right from your phone at
                the gate.
              </p>
            </div>
          </motion.div>

          {/* Small cards */}
          {[
            {
              icon: QrCode,
              title: "QR Code entry",
              desc: "Every ticket has a unique QR code. Gate scanners validate it in real time.",
            },
            {
              icon: Shield,
              title: "Single-use only",
              desc: "Once scanned, a ticket is marked as used. No sharing or duplicates.",
            },
            {
              icon: Users,
              title: "Live capacity tracking",
              desc: "Available slots update instantly. When it's full, registration closes automatically.",
            },
            {
              icon: Zap,
              title: "Free cancellation",
              desc: "Cancel any time before the event. Your slot returns to the pool immediately.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--brand-muted)",
                }}
              >
                <f.icon size={22} style={{ color: "var(--brand)" }} />
              </div>

              <h3 className="font-bold text-lg" style={{ color: "var(--ink)" }}>
                {f.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesHome