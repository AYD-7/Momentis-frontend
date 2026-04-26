import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { getTicket } from "../../api";
import toast from "react-hot-toast";
import type {
  Ticket as TicketType,
  Event,
  Registration,
} from "../../types";
import HeaderTicketLookup from "./components/HeaderTicketLookup";
import SearchTicketLookup from "./components/SearchTicketLookup";
import AnimatePresenceTicketLookup from "./components/AnimatePresenceTicketLookup";

const statusConfig = {
  valid: { label: "Valid", color: "text-green-500", icon: CheckCircle },
  used: { label: "Used", color: "text-gray-400", icon: Clock },
  cancelled: { label: "Cancelled", color: "text-red-500", icon: XCircle },
};

export default function TicketLookupPage() {
  const [code, setCode] = useState("");
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
      toast.error(err.response?.data?.message || "Ticket not found");
    } finally {
      setLoading(false);
    }
  };

  const status = ticket
    ? statusConfig[ticket.status] ?? statusConfig.valid
    : null;

  const StatusIcon = status?.icon;

  const ticketEvent =
    typeof ticket?.event === "object"
      ? (ticket.event as Event)
      : undefined;

  const ticketReg =
    typeof ticket?.registration === "object"
      ? (ticket.registration as Registration)
      : undefined;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="max-w-2xl mx-auto" style={{ padding: "0 1.5rem" }}>
        {/* Header */}
        <HeaderTicketLookup />

        {/* Search */}
        <SearchTicketLookup
          code={code}
          setCode={setCode}
          loading={loading}
          handleLookup={handleLookup}
        />

        {/* Animate Presence */}
        <AnimatePresenceTicketLookup
          ticket={ticket}
          status={status}
          StatusIcon={StatusIcon}
          ticketEvent={ticketEvent}
          ticketReg={ticketReg}
          searched={searched}
          loading={loading}
        />
      </div>
    </div>
  );
}