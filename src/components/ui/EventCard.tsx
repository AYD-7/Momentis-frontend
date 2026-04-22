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
  const fillPct = Math.min(((event.capacity - event.availableSlots) / event.capacity) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ backgroundColor: 'var(--brand)' }} />

      <div className="p-6">
        {/* Category + price */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: 'var(--brand-muted)', color: 'var(--brand)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
            {event.category || 'Event'}
          </span>
          <span className="text-sm font-bold" style={{ color: 'var(--ink)' }}>
            {formatPrice(event.price)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-lg leading-tight mb-3 line-clamp-2 transition-colors"
          style={{ color: 'var(--ink)' }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
          {event.description}
        </p>

        {/* Meta */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
            <Calendar size={13} style={{ color: 'var(--brand)' }} className="shrink-0" />
            <span>{formatEventDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
            <MapPin size={13} style={{ color: 'var(--brand)' }} className="shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={13} style={{ color: 'var(--brand)' }} className="shrink-0" />
            <span className={`font-medium ${slots.color}`}>{slots.label}</span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mb-5">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${fillPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ backgroundColor: 'var(--brand)' }}
            />
          </div>
        </div>

        {/* Button */}
        <Link to={`/events/${event._id}`}>
          <button
            disabled={isFull}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90"
            style={
              isFull
                ? { backgroundColor: 'var(--border)', color: 'var(--muted)', cursor: 'not-allowed' }
                : { backgroundColor: 'var(--brand)', color: '#ffffff' }
            }
          >
            {isFull ? 'Sold Out' : 'View & Register'}
            {!isFull && <ArrowRight size={14} />}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
