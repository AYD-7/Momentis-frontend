import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowLeft, Clock, User, Mail, CheckCircle } from 'lucide-react';
import RegistrationModal from '../components/ui/RegistrationModal';
import Spinner from '../components/ui/Spinner';
import { getEventById } from '../api';
import { formatEventDateLong, formatTime, formatPrice, getSlotsLabel } from '../lib/utils';
import type { Event } from '../types';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      getEventById(id)
        .then((res) => setEvent(res.data.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="pt-24"><Spinner text="Loading event..." /></div>;

  if (!event) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="font-bold text-2xl mb-2" style={{ color: 'var(--ink)' }}>Event not found</h2>
          <Link to="/events" className="text-sm" style={{ color: 'var(--brand)' }}>← Back to events</Link>
        </div>
      </div>
    );
  }

  const slots = getSlotsLabel(event.availableSlots, event.capacity);
  const isFull = event.availableSlots === 0;
  const fillPct = Math.min(((event.capacity - event.availableSlots) / event.capacity) * 100, 100);

  return (
    <>
      <div className="min-h-screen pt-20 pb-16" style={{ backgroundColor: 'var(--bg)' }}>

        {/* Coloured header band */}
        <div className="pt-8 pb-16" style={{ backgroundColor: 'var(--brand)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Link to="/events"
                className="inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <ArrowLeft size={15} /> Back to events
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                {event.category || 'Event'}
              </span>
              <h1 className="font-bold text-3xl md:text-5xl text-white leading-tight mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <span className="flex items-center gap-1.5"><User size={14} /> {event.organizer}</span>
                <span className="flex items-center gap-1.5"><Mail size={14} /> {event.organizerEmail}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pull-up cards */}
        <div className="max-w-5xl mx-auto px-6 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left column */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }} className="lg:col-span-2 space-y-5">

              {/* About */}
              <div className="rounded-2xl border p-7"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--ink)' }}>About this event</h2>
                <p className="leading-relaxed" style={{ color: 'var(--muted)' }}>{event.description}</p>
              </div>

              {/* Details */}
              <div className="rounded-2xl border p-7"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="font-bold text-xl mb-5" style={{ color: 'var(--ink)' }}>Event Details</h2>
                <div className="space-y-4">
                  {[
                    { icon: Calendar, label: 'Date', value: formatEventDateLong(event.date) },
                    { icon: Clock, label: 'Time', value: formatTime(event.date) },
                    { icon: MapPin, label: 'Location', value: event.location },
                    { icon: Users, label: 'Capacity', value: `${event.capacity - event.availableSlots} registered of ${event.capacity} total` },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--brand-muted)' }}>
                        <row.icon size={17} style={{ color: 'var(--brand)' }} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide font-semibold mb-0.5"
                          style={{ color: 'var(--muted)' }}>{row.label}</p>
                        <p className="font-medium" style={{ color: 'var(--ink)' }}>{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div className="rounded-2xl border p-7"
                style={{ backgroundColor: 'var(--brand-muted)', borderColor: 'var(--border)' }}>
                <h2 className="font-bold text-xl mb-5" style={{ color: 'var(--ink)' }}>What to expect</h2>
                <div className="space-y-3">
                  {[
                    'Instant email confirmation after registration',
                    'Unique QR code ticket sent to your inbox',
                    'Show QR code at the entrance for fast check-in',
                    'Each ticket is single-use only — cannot be reused',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={15} className="shrink-0 mt-0.5"
                        style={{ color: 'var(--brand)' }} />
                      <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right column — sticky registration card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}>
              <div className="rounded-2xl border p-6 sticky top-24"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>

                {/* Price */}
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                    Ticket Price
                  </p>
                  <p className="font-bold text-4xl" style={{ color: 'var(--ink)' }}>
                    {formatPrice(event.price)}
                  </p>
                </div>

                {/* Capacity bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Availability</span>
                    <span className={`text-xs font-bold ${slots.color}`}>{slots.label}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fillPct}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: 'var(--brand)' }}
                    />
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>
                    {event.availableSlots} of {event.capacity} spots remaining
                  </p>
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: isFull ? 1 : 1.02 }}
                  whileTap={{ scale: isFull ? 1 : 0.97 }}
                  onClick={() => !isFull && setShowModal(true)}
                  disabled={isFull}
                  className="w-full py-4 rounded-xl font-bold text-sm transition-all mb-3"
                  style={
                    isFull
                      ? { backgroundColor: 'var(--border)', color: 'var(--muted)', cursor: 'not-allowed' }
                      : { backgroundColor: 'var(--brand)', color: '#ffffff' }
                  }
                >
                  {isFull ? 'Sold Out' : 'Register for this Event'}
                </motion.button>

                <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
                  Free cancellation before the event
                </p>

                <div className="border-t my-5" style={{ borderColor: 'var(--border)' }} />

                {/* Organiser */}
                <div>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
                    Organizer
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--brand-muted)' }}>
                      <User size={15} style={{ color: 'var(--brand)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{event.organizer}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{event.organizerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {showModal && <RegistrationModal event={event} onClose={() => setShowModal(false)} />}
    </>
  );
}
