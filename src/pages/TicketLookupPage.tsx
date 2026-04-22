import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Ticket, Calendar, MapPin, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getTicket } from '../api';
import { formatEventDateLong, formatTime } from '../lib/utils';
import toast from 'react-hot-toast';
import type { Ticket as TicketType, Event, Registration } from '../types';

const statusConfig = {
  valid:     { label: 'Valid',     color: 'text-green-500', icon: CheckCircle },
  used:      { label: 'Used',      color: 'text-gray-400',  icon: Clock },
  cancelled: { label: 'Cancelled', color: 'text-red-500',   icon: XCircle },
};

export default function TicketLookupPage() {
  const [code, setCode] = useState('');
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setTicket(null);
    setSearched(true);
    try {
      const res = await getTicket(code.trim().toUpperCase());
      setTicket(res.data.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Ticket not found');
    } finally {
      setLoading(false);
    }
  };

  const status = ticket ? (statusConfig[ticket.status] ?? statusConfig.valid) : null;
  const StatusIcon = status?.icon;
  const ticketEvent = ticket?.event as Event | undefined;
  const ticketReg   = ticket?.registration as Registration | undefined;

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: 'var(--brand-muted)' }}>
            <Ticket size={28} style={{ color: 'var(--brand)' }} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
            Ticket Lookup
          </p>
          <h1 className="font-bold text-4xl mb-3" style={{ color: 'var(--ink)' }}>Find Your Ticket</h1>
          <p style={{ color: 'var(--muted)' }}>
            Enter the ticket code from your confirmation email.
          </p>
        </motion.div>

        {/* Search */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }} onSubmit={handleLookup} className="mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--muted)' }} />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. AB12-CD34-EF56"
                className="w-full pl-11 pr-4 py-4 border rounded-xl text-sm font-mono focus:outline-none tracking-widest"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--ink)' }}
              />
            </div>
            <motion.button type="submit" disabled={loading || !code.trim()}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="text-white px-6 py-4 rounded-xl font-semibold text-sm disabled:opacity-50 whitespace-nowrap"
              style={{ backgroundColor: 'var(--brand)' }}>
              {loading ? 'Looking...' : 'Look Up'}
            </motion.button>
          </div>
        </motion.form>

        <AnimatePresence>
          {ticket && status && StatusIcon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* Ticket header */}
              <div className="p-6" style={{ backgroundColor: 'var(--brand)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">Ticket</p>
                    <p className="font-bold text-white text-3xl tracking-widest font-mono">
                      {ticket.ticketCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20">
                    <StatusIcon size={13} className="text-white" />
                    <span className="text-xs font-bold text-white">{status.label}</span>
                  </div>
                </div>
              </div>

              {/* Dashed divider */}
              <div className="border-t-2 border-dashed mx-6" style={{ borderColor: 'var(--border)' }} />

              <div className="p-6 space-y-5">

                {/* Attendee */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--brand-muted)' }}>
                    <User size={16} style={{ color: 'var(--brand)' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Attendee</p>
                    <p className="font-semibold" style={{ color: 'var(--ink)' }}>
                      {ticketReg?.firstName} {ticketReg?.lastName}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{ticket.attendeeEmail}</p>
                  </div>
                </div>

                {/* Event info */}
                {ticketEvent && (
                  <div className="rounded-xl p-4 space-y-2"
                    style={{ backgroundColor: 'var(--bg-alt)' }}>
                    <h3 className="font-bold" style={{ color: 'var(--ink)' }}>{ticketEvent.title}</h3>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                      <Calendar size={13} style={{ color: 'var(--brand)' }} />
                      {formatEventDateLong(ticketEvent.date)} at {formatTime(ticketEvent.date)}
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                      <MapPin size={13} style={{ color: 'var(--brand)' }} />
                      {ticketEvent.location}
                    </div>
                  </div>
                )}

                {/* Used info */}
                {ticket.status === 'used' && ticket.usedAt && (
                  <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-alt)' }}>
                    <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>
                      Checked in at
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                      {new Date(ticket.usedAt).toLocaleString()}
                    </p>
                    {ticket.scannedBy && (
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>by {ticket.scannedBy}</p>
                    )}
                  </div>
                )}

                {/* QR code */}
                {ticket.qrCode && ticket.status === 'valid' && (
                  <div className="text-center py-4">
                    <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                      Your QR Code
                    </p>
                    <img src={ticket.qrCode} alt="QR Code"
                      className="w-40 h-40 mx-auto rounded-xl p-1 border-4"
                      style={{ borderColor: 'var(--brand)' }} />
                    <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
                      Show this at the entrance
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {searched && !ticket && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-4xl mb-3">🎟️</p>
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--ink)' }}>No ticket found</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Double-check the code in your confirmation email.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
