import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  cat: string;
  setCat: (v: string) => void;
  price: "all" | "free" | "paid";
  setPrice: (v: "all" | "free" | "paid") => void;
  CATS: string[];
};

const FiltersEvents = ({
  search,
  setSearch,
  cat,
  setCat,
  price,
  setPrice,
  CATS,
}: Props) => {
  const pill = (active: boolean) => ({
    backgroundColor: active ? "var(--brand)" : "var(--bg-card)",
    color: active ? "#fff" : "var(--muted)",
    borderColor: active ? "var(--brand)" : "var(--border)",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        marginBottom: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* SEARCH */}
      <div style={{ position: "relative", maxWidth: "420px" }}>
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--muted)" }}
        />

        <input
          type="text"
          placeholder="Search events or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl text-sm focus:outline-none transition-colors"
          style={{
            padding: "0.75rem 1rem 0.75rem 2.75rem",
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--ink)",
          }}
        />
      </div>

      {/* FILTER PILLS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <SlidersHorizontal size={14} style={{ color: "var(--muted)" }} />

        {CATS.map((c) => (
          <motion.button
            key={c}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCat(c)}
            className="text-sm font-medium border rounded-full"
            style={{
              ...pill(cat === c),
              padding: "0.35rem 0.9rem",
            }}
          >
            {c}
          </motion.button>
        ))}

        {/* Divider */}
        <span
          style={{
            width: "1px",
            height: "16px",
            margin: "0 0.4rem",
            backgroundColor: "var(--border)",
          }}
        />

        {(["all", "free", "paid"] as const).map((p) => (
          <motion.button
            key={p}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPrice(p)}
            className="text-sm font-medium border rounded-full capitalize"
            style={{
              ...pill(price === p),
              padding: "0.35rem 0.9rem",
            }}
          >
            {p === "all"
              ? "All Prices"
              : p.charAt(0).toUpperCase() + p.slice(1)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default FiltersEvents;