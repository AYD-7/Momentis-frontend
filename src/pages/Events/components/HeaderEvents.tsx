import { motion } from "framer-motion";

type Props = {
  eventsCount: number;
};

const HeaderEvents = ({ eventsCount }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginBottom: "3rem" }}
    >
      <p
        className="text-sm font-semibold uppercase tracking-widest mb-3"
        style={{ color: "var(--brand)" }}
      >
        Discover
      </p>

      <h1
        className="font-bold text-5xl mb-4"
        style={{ color: "var(--ink)" }}
      >
        All Events
      </h1>

      <p className="text-lg" style={{ color: "var(--muted)" }}>
        {eventsCount} events available — find yours and register in seconds.
      </p>
    </motion.div>
  );
};

export default HeaderEvents;