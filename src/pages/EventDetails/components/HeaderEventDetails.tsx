import React from 'react'
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft, User, Mail, } from 'lucide-react'
import { Event } from '../../../types'


type Props = {
    event: Event
}
const HeaderEventDetails = ({ event }: Props ) => {
  return (
    <div
      style={{
        backgroundColor: "var(--brand)",
        paddingTop: "2rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="max-w-5xl mx-auto" style={{ padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            <ArrowLeft size={15} /> Back to events
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            {event.category || "Event"}
          </span>

          <h1 className="font-bold text-3xl md:text-5xl text-white leading-tight mb-4">
            {event.title}
          </h1>

          <div
            className="flex flex-wrap text-sm"
            style={{ gap: "1rem", color: "rgba(255,255,255,0.65)" }}
          >
            <span className="flex items-center gap-1.5">
              <User size={14} /> {event.organizer}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} /> {event.organizerEmail}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeaderEventDetails