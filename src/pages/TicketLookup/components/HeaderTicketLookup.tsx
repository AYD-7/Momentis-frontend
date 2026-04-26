import React from 'react'
import { motion } from "framer-motion"
import { Ticket } from 'lucide-react';

const HeaderTicketLookup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
      style={{ marginBottom: "3rem" }}
    >
      <div
        className="rounded-2xl flex items-center justify-center mx-auto"
        style={{
          width: "64px",
          height: "64px",
          marginBottom: "1.25rem",
          backgroundColor: "var(--brand-muted)",
        }}
      >
        <Ticket size={28} style={{ color: "var(--brand)" }} />
      </div>

      <p
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--brand)", marginBottom: "0.75rem" }}
      >
        Ticket Lookup
      </p>

      <h1
        className="font-bold text-4xl"
        style={{ color: "var(--ink)", marginBottom: "0.75rem" }}
      >
        Find Your Ticket
      </h1>

      <p style={{ color: "var(--muted)" }}>
        Enter the ticket code from your confirmation email.
      </p>
    </motion.div>
  );
}

export default HeaderTicketLookup