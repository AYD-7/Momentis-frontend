import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, User, Mail, Phone, FileText } from 'lucide-react';
import { registerForEvent } from '../../api';
import toast from 'react-hot-toast';
import type { Event, RegistrationResult } from '../../types';

interface Props {
  event: Event;
  onClose: () => void;
}

export default function RegistrationModal({ event, onClose }: Props) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<RegistrationResult | null>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerForEvent({ eventId: event._id, ...form });
      setSuccess(res.data.data);
      toast.success('Registered! Check your email for the ticket.');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full border rounded-lg text-sm focus:outline-none transition-colors";
  const inputStyle = {
    backgroundColor: 'var(--bg)',
    borderColor: 'var(--border)',
    color: 'var(--ink)',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          {/* Header */}
          <div className="px-6 py-5 flex items-start justify-between"
            style={{ backgroundColor: 'var(--brand)' }}>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Register</p>
              <h2 className="font-bold text-white text-xl leading-tight">{event.title}</h2>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors mt-1">
              <X size={20} />
            </button>
          </div>

          {success ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--brand-muted)' }}>
                <CheckCircle size={32} style={{ color: 'var(--brand)' }} />
              </div>
              <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--ink)' }}>You're registered!</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                Your ticket and QR code have been sent to your email.
              </p>
              <div className="rounded-xl p-4 mb-6 text-left"
                style={{ backgroundColor: 'var(--bg-alt)' }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                  Your Ticket Code
                </p>
                <p className="font-bold text-3xl tracking-widest font-mono" style={{ color: 'var(--brand)' }}>
                  {success.ticket?.ticketCode}
                </p>
              </div>
              <button onClick={onClose}
                className="w-full text-white py-3 rounded-xl font-semibold text-sm"
                style={{ backgroundColor: 'var(--brand)' }}>
                Done
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {([['firstName', 'First Name', 'Jane'], ['lastName', 'Last Name', 'Doe']] as const).map(([name, label, ph]) => (
                  <div key={name}>
                    <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                      style={{ color: 'var(--ink)' }}>{label} *</label>
                    <div className="relative">
                      <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--muted)' }} />
                      <input name={name} value={form[name]} onChange={handle} required placeholder={ph}
                        className={`${inputCls} pl-9 pr-3 py-2.5`} style={inputStyle} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                  style={{ color: 'var(--ink)' }}>Email *</label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--muted)' }} />
                  <input name="email" type="email" value={form.email} onChange={handle}
                    required placeholder="jane@example.com"
                    className={`${inputCls} pl-9 pr-3 py-2.5`} style={inputStyle} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                  style={{ color: 'var(--ink)' }}>Phone</label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--muted)' }} />
                  <input name="phone" value={form.phone} onChange={handle} placeholder="08012345678"
                    className={`${inputCls} pl-9 pr-3 py-2.5`} style={inputStyle} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
                  style={{ color: 'var(--ink)' }}>Notes (optional)</label>
                <div className="relative">
                  <FileText size={13} className="absolute left-3 top-3"
                    style={{ color: 'var(--muted)' }} />
                  <textarea name="notes" value={form.notes} onChange={handle} rows={3}
                    placeholder="Any special requirements..."
                    className={`${inputCls} pl-9 pr-3 py-2.5 resize-none`} style={inputStyle} />
                </div>
              </div>

              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: 'var(--brand)' }}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Registering...</> : 'Confirm Registration'}
              </motion.button>

              <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
                A ticket + QR code will be sent to your email.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
