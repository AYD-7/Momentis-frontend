import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanLine,
  CheckCircle,
  XCircle,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { validateTicket } from "../api";

interface Result {
  success: boolean;
  message: string;
  data: {
    attendeeName: string;
    event: string;
    usedAt: string;
  } | null;
}

export default function ValidatePage() {
  const [code, setCode] = useState("");
  const [scannedBy, setScannedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      const res = await validateTicket(
        code.trim().toUpperCase(),
        scannedBy || "Gate Scanner"
      );

      setResult({
        success: true,
        message: res.data.message,
        data: res.data.data,
      });
    } catch (err: any) {
      setResult({
        success: false,
        message:
          err.response?.data?.message || "Validation failed",
        data: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCode("");
    setResult(null);
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{ backgroundColor: "var(--bg)", paddingTop: "6rem", paddingBottom: "4rem" }}
    >
      <div className="w-5/6 lg:w-full max-w-md px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          style={{ marginBottom: "2.5rem" }}
        >
          <div
            className="rounded-2xl flex items-center justify-center mx-auto"
            style={{
              width: "64px",
              height: "64px",
              marginBottom: "1.25rem",
              backgroundColor: "var(--brand)",
            }}
          >
            <ShieldCheck size={28} className="text-white" />
          </div>

          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{
              marginBottom: "0.5rem",
              color: "var(--brand)",
            }}
          >
            Gate Access
          </p>

          <h1
            className="font-bold text-4xl"
            style={{
              marginBottom: "0.5rem",
              color: "var(--ink)",
            }}
          >
            Validate Ticket
          </h1>

          <p
            className="text-sm"
            style={{ color: "var(--muted)" }}
          >
            Enter a ticket code to check in at the gate. Each
            ticket can only be validated once.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {result ? (
            /* RESULT */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-3xl text-center"
              style={{
                padding: "2.5rem",
                backgroundColor: result.success
                  ? "var(--brand)"
                  : "var(--bg-card)",
                border: result.success
                  ? "none"
                  : "1px solid var(--border)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="rounded-full flex items-center justify-center mx-auto"
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "1.5rem",
                  backgroundColor: result.success
                    ? "rgba(255,255,255,0.2)"
                    : "var(--brand-muted)",
                }}
              >
                {result.success ? (
                  <CheckCircle
                    size={40}
                    className="text-white"
                  />
                ) : (
                  <XCircle
                    size={40}
                    style={{ color: "var(--brand)" }}
                  />
                )}
              </motion.div>

              <h2
                className="font-bold text-2xl"
                style={{
                  marginBottom: "0.5rem",
                  color: result.success
                    ? "#ffffff"
                    : "var(--ink)",
                }}
              >
                {result.success
                  ? "Access Granted!"
                  : "Access Denied"}
              </h2>

              <p
                className="text-sm"
                style={{
                  marginBottom: "1.5rem",
                  color: result.success
                    ? "rgba(255,255,255,0.7)"
                    : "var(--muted)",
                }}
              >
                {result.message}
              </p>

              {result.success && result.data && (
                <div
                  className="rounded-2xl text-left space-y-3"
                  style={{
                    padding: "1.25rem",
                    marginBottom: "1.5rem",
                    backgroundColor:
                      "rgba(255,255,255,0.15)",
                  }}
                >
                  {[
                    {
                      label: "Name",
                      value: result.data.attendeeName,
                    },
                    {
                      label: "Event",
                      value: result.data.event,
                    },
                    {
                      label: "Checked In",
                      value: new Date(
                        result.data.usedAt
                      ).toLocaleTimeString(),
                    },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-white/50 text-xs uppercase tracking-wide">
                        {row.label}
                      </p>
                      <p className="text-white font-semibold">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={reset}
                className="flex items-center gap-2 mx-auto rounded-full font-semibold text-sm"
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: result.success
                    ? "rgba(255,255,255,0.2)"
                    : "var(--brand)",
                  color: "#ffffff",
                }}
              >
                <RotateCcw size={15} />
                Scan Another Ticket
              </motion.button>
            </motion.div>
          ) : (
            /* FORM */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <form
                onSubmit={handleValidate}
                className="space-y-4"
              >
                {/* Ticket Code */}
                <div>
                  <label
                    className="text-xs font-bold uppercase tracking-wide block"
                    style={{
                      marginBottom: "0.5rem",
                      color: "var(--ink)",
                    }}
                  >
                    Ticket Code *
                  </label>

                  <div className="relative">
                    <ScanLine
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--muted)" }}
                    />

                    <input
                      type="text"
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.toUpperCase())
                      }
                      placeholder="AB12-CD34-EF56"
                      required
                      autoFocus
                      className="w-full border rounded-xl font-mono text-lg tracking-widest focus:outline-none text-center"
                      style={{
                        padding: "1rem 1rem 1rem 2.75rem",
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border)",
                        color: "var(--ink)",
                      }}
                    />
                  </div>
                </div>

                {/* Scanned By */}
                <div style={{marginTop: "2rem", marginBottom: "1.5rem"}}>
                  <label
                    className="text-xs font-bold uppercase tracking-wide block"
                    style={{
                      marginBottom: "0.5rem",
                      color: "var(--ink)",
                    }}
                  >
                    Scanned By (optional)
                  </label>

                  <input
                    type="text"
                    value={scannedBy}
                    onChange={(e) =>
                      setScannedBy(e.target.value)
                    }
                    placeholder="e.g. Gate A — James"
                    className="w-full border rounded-xl text-sm focus:outline-none"
                    style={{
                      padding: "1rem",
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border)",
                      color: "var(--ink)",
                    }}
                  />
                </div>

                {/* Button */}
                <motion.button
                  type="submit"
                  disabled={loading || !code.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{
                    padding: "1rem",
                    backgroundColor: "var(--brand)",
                  }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Validate Ticket
                    </>
                  )}
                </motion.button>
              </form>

              <p
                className="text-center text-xs"
                style={{
                  marginTop: "1.25rem",
                  color: "var(--muted)",
                }}
              >
                Validating a ticket marks it as used permanently.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}