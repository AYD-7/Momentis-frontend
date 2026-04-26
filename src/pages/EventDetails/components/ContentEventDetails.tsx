import React from 'react'
import { motion } from "framer-motion"
import { Event } from '../../../types';
import { Calendar, CheckCircle, Clock, MapPin, User, Users } from 'lucide-react';
import { formatEventDateLong, formatPrice, formatTime, getSlotsLabel } from '../../../lib/utils';

type Props = {
    event: Event,
    onRegister: () => void;
}

const ContentEventDetails = ({ event, onRegister }: Props) => {
    const slots = getSlotsLabel(event.availableSlots, event.capacity);
    const isFull = event.availableSlots === 0;
    const fillPct = Math.min(((event.capacity - event.availableSlots) / event.capacity) * 100, 100);

  return (
    <div
      className="max-w-5xl mx-auto"
      style={{
        padding: "0 1.5rem",
        marginTop: "-2rem", // replaces -mt-8
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-3"
        style={{ gap: "1.5rem" }}
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* ABOUT */}
          <div
            className="rounded-2xl border"
            style={{
              padding: "1.75rem",
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <h2
              className="font-bold text-xl mb-4"
              style={{ color: "var(--ink)" }}
            >
              About this event
            </h2>
            <p style={{ color: "var(--muted)" }}>{event.description}</p>
          </div>

          {/* DETAILS */}
          <div
            className="rounded-2xl border"
            style={{
              padding: "1.75rem",
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <h2
              className="font-bold text-xl mb-5"
              style={{ color: "var(--ink)" }}
            >
              Event Details
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[
                {
                  icon: Calendar,
                  label: "Date",
                  value: formatEventDateLong(event.date),
                },
                {
                  icon: Clock,
                  label: "Time",
                  value: formatTime(event.date),
                },
                { icon: MapPin, label: "Location", value: event.location },
                {
                  icon: Users,
                  label: "Capacity",
                  value: `${event.capacity - event.availableSlots} registered of ${event.capacity}`,
                },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", gap: "1rem" }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      backgroundColor: "var(--brand-muted)",
                    }}
                  >
                    <row.icon size={17} style={{ color: "var(--brand)" }} />
                  </div>

                  <div>
                    <p
                      className="text-xs mb-0.5"
                      style={{ color: "var(--muted)" }}
                    >
                      {row.label}
                    </p>
                    <p className="font-medium" style={{ color: "var(--ink)" }}>
                      {row.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXPECT */}
          <div
            className="rounded-2xl border"
            style={{
              padding: "1.75rem",
              backgroundColor: "var(--brand-muted)",
              borderColor: "var(--border)",
            }}
          >
            <h2
              className="font-bold text-xl mb-5"
              style={{ color: "var(--ink)" }}
            >
              What to expect
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                "Instant email confirmation after registration",
                "Unique QR code ticket sent to your inbox",
                "Fast QR check-in at the venue",
                "Single-use secure ticket validation",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.75rem" }}>
                  <CheckCircle size={15} style={{ color: "var(--brand)" }} />
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div
            className="rounded-2xl border"
            style={{
              padding: "1.5rem",
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              position: "sticky",
              top: "6rem",
            }}
          >
            {/* PRICE */}
            <div style={{ marginBottom: "1.25rem" }}>
              <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
                Ticket Price
              </p>
              <p className="text-4xl font-bold" style={{ color: "var(--ink)" }}>
                {formatPrice(event.price)}
              </p>
            </div>

            {/* BAR */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  Availability
                </span>
                <span className={`text-xs font-bold ${slots.color}`}>
                  {slots.label}
                </span>
              </div>

              <div
                style={{
                  height: "8px",
                  borderRadius: "999px",
                  overflow: "hidden",
                  backgroundColor: "var(--border)",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fillPct}%` }}
                  className="h-full"
                  style={{ backgroundColor: "var(--brand)" }}
                />
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: isFull ? 1 : 1.02 }}
              whileTap={{ scale: isFull ? 1 : 0.97 }}
              onClick={() => !isFull && onRegister()}
              disabled={isFull}
              className="w-full rounded-xl font-bold text-sm"
              style={{
                padding: "1rem",
                marginBottom: "0.75rem",
                ...(isFull
                  ? {
                      backgroundColor: "var(--border)",
                      color: "var(--muted)",
                    }
                  : {
                      backgroundColor: "var(--brand)",
                      color: "#fff",
                    }),
              }}
            >
              {isFull ? "Sold Out" : "Register for this Event"}
            </motion.button>

            {/* ORGANIZER */}
            <div style={{ marginTop: "1.25rem" }}>
              <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                Organizer
              </p>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--brand-muted)",
                  }}
                >
                  <User size={15} style={{ color: "var(--brand)" }} />
                </div>

                <div>
                  <p style={{ color: "var(--ink)" }}>{event.organizer}</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                    {event.organizerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContentEventDetails