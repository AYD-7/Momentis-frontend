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
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

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

  const inputStyle = {
    backgroundColor: 'var(--bg)',
    borderColor: 'var(--border)',
    color: 'var(--ink)',
  };

  const inputBase = {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--border)',
    ...inputStyle,
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: "32rem",
            borderRadius: "1rem",
            overflow: "hidden",
            backgroundColor: "var(--bg-card)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "1.25rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              backgroundColor: "var(--brand)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Register
              </p>
              <h2 style={{ color: "#fff", fontWeight: 700 }}>{event.title}</h2>
            </div>

            <button
              onClick={onClose}
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <X size={20} />
            </button>
          </div>

          {success ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "999px",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "var(--brand-muted)",
                }}
              >
                <CheckCircle size={32} style={{ color: "var(--brand)" }} />
              </div>

              <h3 style={{ fontWeight: 700 }}>You're registered!</h3>
              <p style={{ color: "var(--muted)", margin: "0.5rem 0 1.5rem" }}>
                Your ticket has been sent to your email.
              </p>

              <button
                onClick={onClose}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "var(--brand)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* FIRST + LAST NAME */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {(
                  [
                    { name: "firstName", label: "First Name" },
                    { name: "lastName", label: "Last Name" },
                  ] as const
                ).map((field) => (
                  <div key={field.name} style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        marginBottom: "0.4rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      {field.label}
                    </label>

                    <div style={{ position: "relative" }}>
                      <User
                        size={13}
                        style={{
                          position: "absolute",
                          left: "0.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--muted)",
                        }}
                      />

                      <input
                        name={field.name}
                        value={form[field.name]}
                        onChange={handle}
                        placeholder={field.label}
                        required
                        style={inputBase}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* EMAIL */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Email
                </label>
                <div style={{ position: "relative", marginTop: "0.4rem" }}>
                  <Mail
                    size={13}
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--muted)",
                    }}
                  />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handle}
                    placeholder="Email"
                    required
                    style={inputBase}
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Phone
                </label>
                <div style={{ position: "relative", marginTop: "0.4rem" }}>
                  <Phone
                    size={13}
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--muted)",
                    }}
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handle}
                    placeholder="Phone"
                    style={inputBase}
                  />
                </div>
              </div>

              {/* NOTES */}
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Notes
                </label>
                <div style={{ position: "relative", marginTop: "0.4rem" }}>
                  <FileText
                    size={13}
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "0.75rem",
                      color: "var(--muted)",
                    }}
                  />
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handle}
                    placeholder="Any special requirements..."
                    rows={3}
                    style={{
                      ...inputBase,
                      paddingTop: "0.75rem",
                      resize: "none",
                    }}
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  padding: "0.9rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "var(--brand)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Registering..." : "Confirm Registration"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}