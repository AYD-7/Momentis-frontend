import React from 'react'
import { motion } from "framer-motion"

const StatsHome = () => {
    //  Stat counter 
    function StatCounter({ value, label }: { value: string; label: string }) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2"
        >
          <p
            className="font-bold leading-none mb-2 "
            style={{ fontSize: "clamp(32px,4vw,56px)", color: "var(--brand)" }}
          >
            {value}
          </p>
          <p
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--muted)" }}
          >
            {label}
          </p>
        </motion.div>
      );
    }

  return (
    <section
      className="py-16 border-b flex justify-center"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
        paddingBlock: "20px",
      }}
    >
      <div className="lg:min-w-6xl mx-auto px-6">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-0"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { value: "10+", label: "Events listed" },
            { value: "500+", label: "Seats available" },
            { value: "100%", label: "Digital ticketing" },
            { value: "< 1min", label: "To register" },
          ].map((s) => (
            <div key={s.label} className="">
              <StatCounter value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsHome