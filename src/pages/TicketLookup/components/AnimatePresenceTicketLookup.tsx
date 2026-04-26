import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, MapPin } from "lucide-react";

import { formatEventDateLong, formatTime } from "../../../lib/utils";
import type { Ticket as TicketType, Event, Registration } from "../../../types";

type StatusType = {
  label: string;
  color: string;
  icon: any;
};

type Props = {
  ticket: TicketType | null;
  status: StatusType | null;
  StatusIcon: any;
  ticketEvent?: Event;
  ticketReg?: Registration;
  searched: boolean;
  loading: boolean;
};

const AnimatePresenceTicketLookup = ({
  ticket,
  status,
  StatusIcon,
  ticketEvent,
  ticketReg,
  searched,
  loading,
}: Props) => {
  return (
    <AnimatePresence>
      {ticket && status && StatusIcon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1.5rem",
              backgroundColor: "var(--brand)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
                  Ticket
                </p>
                <p className="font-bold text-white text-3xl tracking-widest font-mono">
                  {ticket.ticketCode}
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20">
                <StatusIcon size={13} className="text-white" />
                <span className="text-xs font-bold text-white">
                  {status.label}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="border-t-2 border-dashed"
            style={{
              margin: "0 1.5rem",
              borderColor: "var(--border)",
            }}
          />

          {/* Content */}
          <div
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Attendee */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "var(--brand-muted)",
                }}
              >
                <User size={16} style={{ color: "var(--brand)" }} />
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--muted)" }}
                >
                  Attendee
                </p>
                <p className="font-semibold" style={{ color: "var(--ink)" }}>
                  {ticketReg?.firstName} {ticketReg?.lastName}
                </p>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {ticket.attendeeEmail}
                </p>
              </div>
            </div>

            {/* Event */}
            {ticketEvent && (
              <div
                className="rounded-xl"
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-alt)",
                }}
              >
                <h3 className="font-bold" style={{ color: "var(--ink)" }}>
                  {ticketEvent.title}
                </h3>

                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  <Calendar size={13} style={{ color: "var(--brand)" }} />
                  {formatEventDateLong(ticketEvent.date)} at{" "}
                  {formatTime(ticketEvent.date)}
                </div>

                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  <MapPin size={13} style={{ color: "var(--brand)" }} />
                  {ticketEvent.location}
                </div>
              </div>
            )}

            {/* QR */}
            {ticket.qrCode && ticket.status === "valid" && (
              <div className="text-center" style={{ padding: "1rem 0" }}>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{
                    color: "var(--muted)",
                    marginBottom: "1rem",
                  }}
                >
                  Your QR Code
                </p>

                <img
                  src={ticket.qrCode}
                  alt="QR Code"
                  className="mx-auto rounded-xl"
                  style={{
                    width: "160px",
                    height: "160px",
                    padding: "0.25rem",
                    borderWidth: "4px",
                    borderColor: "var(--brand)",
                  }}
                />

                <p
                  className="text-xs"
                  style={{
                    color: "var(--muted)",
                    marginTop: "0.75rem",
                  }}
                >
                  Show this at the entrance
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {searched && !ticket && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
          style={{ padding: "3rem 0" }}
        >
          <p className="text-4xl mb-3">🎟️</p>
          <h3
            className="font-bold text-lg mb-1"
            style={{ color: "var(--ink)" }}
          >
            No ticket found
          </h3>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Double-check the code in your confirmation email.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatePresenceTicketLookup;