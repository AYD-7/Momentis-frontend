import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { formatEventDate, formatPrice, getSlotsLabel } from '../../lib/utils';
import type { Event } from '../../types';

interface Props {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 0 }: Props) {
  const slots = getSlotsLabel(event.availableSlots, event.capacity);
  const isFull = event.availableSlots === 0;
  const fillPct = Math.min(
    ((event.capacity - event.availableSlots) / event.capacity) * 100,
    100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: "4px",
          backgroundColor: 'var(--brand)',
        }}
      />

      <div
        style={{
          padding: "1.5rem",
        }}
      >
        {/* Category + price */}
        <div
          className="flex items-start justify-between"
          style={{
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <span
            className="inline-flex items-center text-xs font-semibold rounded-full"
            style={{
              gap: "0.375rem",
              padding: "0.25rem 0.75rem",
              backgroundColor: 'var(--brand-muted)',
              color: 'var(--brand)',
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                backgroundColor: 'var(--brand)',
              }}
            />
            {event.category || 'Event'}
          </span>

          <span
            className="text-sm font-bold"
            style={{ color: 'var(--ink)' }}
          >
            {formatPrice(event.price)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-lg leading-tight line-clamp-2"
          style={{
            marginBottom: "0.75rem",
            color: 'var(--ink)',
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{
            marginBottom: "1rem",
            color: 'var(--muted)',
          }}
        >
          {event.description}
        </p>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <div className="flex items-center text-sm" style={{ gap: "0.5rem", color: 'var(--muted)' }}>
            <Calendar size={13} style={{ color: 'var(--brand)' }} />
            <span>{formatEventDate(event.date)}</span>
          </div>

          <div className="flex items-center text-sm" style={{ gap: "0.5rem", color: 'var(--muted)' }}>
            <MapPin size={13} style={{ color: 'var(--brand)' }} />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center text-sm" style={{ gap: "0.5rem" }}>
            <Users size={13} style={{ color: 'var(--brand)' }} />
            <span className={`font-medium ${slots.color}`}>{slots.label}</span>
          </div>
        </div>

        {/* Capacity bar */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              height: "6px",
              borderRadius: "999px",
              overflow: "hidden",
              backgroundColor: 'var(--border)',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${fillPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                height: "100%",
                borderRadius: "999px",
                backgroundColor: 'var(--brand)',
              }}
            />
          </div>
        </div>

        {/* Button */}
        <Link to={`/events/${event._id}`}>
          <button
            disabled={isFull}
            className="w-full flex items-center justify-center text-sm font-semibold rounded-xl transition-all duration-300 hover:opacity-90"
            style={{
              gap: "0.5rem",
              padding: "0.75rem",
              ...(isFull
                ? {
                    backgroundColor: 'var(--border)',
                    color: 'var(--muted)',
                    cursor: 'not-allowed',
                  }
                : {
                    backgroundColor: 'var(--brand)',
                    color: '#ffffff',
                  }),
            }}
          >
            {isFull ? 'Sold Out' : 'View & Register'}
            {!isFull && <ArrowRight size={14} />}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}