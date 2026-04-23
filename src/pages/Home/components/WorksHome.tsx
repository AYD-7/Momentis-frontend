import React from 'react'
import { motion } from "framer-motion"
import { Calendar, Zap, QrCode, } from "lucide-react"

const WorksHome = () => {
  return (
    <section
      className="overflow-hidden flex "
      style={{
        backgroundColor: "var(--bg)",
        paddingBlock: "5rem",
        // paddingInline: "1.5rem"
      }}
    >
      <div
        className="max-w-6xl px-6"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          marginInline: "auto",

        }}
      >
        <div
          className="flex flex-col md:flex-row items-start"
          style={{ gap: "64px" }} // replaces gap-16
        >
          {/* Sticky left heading */}
          <div
            className="md:w-60 shrink-0 md:sticky md:top-28"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-screen md:w-2/3 text-center flex flex-col gap-12px md:gap-18px items-center md:items-start"
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: "var(--brand)" }}
              >
                Process
              </p>

              <h2
                className="font-bold text-4xl leading-tight"
                style={{ color: "var(--ink)" }}
              >
                How it <br className="hidden md:block" />
                works
              </h2>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)", textAlign: "start" }}
              >
                From browsing to gate entry in three steps.
              </p>
            </motion.div>
          </div>

          {/* Steps */}
          <div
            className="flex-1 max-w-7/8 lg:max-w-full"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginInline: "auto",
            }}
          >
            {[
              {
                num: "01",
                title: "Find your event",
                desc: "Browse upcoming tech events, workshops, and summits. Filter by category, price, or availability.",
                icon: Calendar,
              },
              {
                num: "02",
                title: "Register in under a minute",
                desc: "Enter your name and email. That's it. A confirmation lands in your inbox with your unique ticket.",
                icon: Zap,
              },
              {
                num: "03",
                title: "Scan in at the gate",
                desc: "Show your QR code at the entrance. One scan and you're in — each ticket works exactly once.",
                icon: QrCode,
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex border-b last:border-b-0"
                style={{
                  borderColor: "var(--border)",
                  paddingTop: "32px",
                  paddingBottom: "32px",
                  gap: "24px", // replaces gap-6
                }}
              >
                <span
                  className="font-bold text-5xl leading-none shrink-0 w-16"
                  style={{
                    color: "var(--brand-muted)",
                    paddingTop: "4px",
                  }}
                >
                  {step.num}
                </span>

                <div
                  className="flex-1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div className="flex items-center" style={{ gap: "12px" }}>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "var(--brand-muted)" }}
                    >
                      <step.icon size={16} style={{ color: "var(--brand)" }} />
                    </div>

                    <h3
                      className="font-bold text-xl"
                      style={{ color: "var(--ink)" }}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorksHome