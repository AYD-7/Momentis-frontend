import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

type Props = {
  code: string;
  setCode: (value: string) => void;
  loading: boolean;
  handleLookup: (e: React.FormEvent) => void;
};

const SearchTicketLookup = ({
  code,
  setCode,
  loading,
  handleLookup,
}: Props) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      onSubmit={handleLookup}
      style={{ marginBottom: "2rem" }}
    >
      <div className="flex" style={{ gap: "0.75rem" }}>
        {/* Input */}
        <div className="relative flex-1">
          <Search
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
            placeholder="e.g. AB12-CD34-EF56"
            className="w-full border rounded-xl text-sm font-mono focus:outline-none tracking-widest"
            style={{
              padding: "1rem 1rem 1rem 2.75rem",
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
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className="text-white rounded-xl font-semibold text-sm disabled:opacity-50 whitespace-nowrap"
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "var(--brand)",
            cursor:
              loading || !code.trim()
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading ? "Looking..." : "Look Up"}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default SearchTicketLookup;