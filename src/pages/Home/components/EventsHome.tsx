import React, { useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Users, Zap, ArrowUpRight,
} from "lucide-react"
import Spinner from '../../../components/ui/Spinner'
import { getAllEvents } from "../../../api";
import type { Event } from "../../../types";
import EventCard from '../../../components/ui/EventCard'


const EventsHome = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents()
      .then((res) => setEvents(res.data.data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      style={{
        backgroundColor: "var(--bg-alt)",
        paddingBlock: "5rem",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Header */}
        <div className="flex justify-center lg:justify-between items-end text-center lg:text-start flex-wrap gap-16 lg:gap-4 " style={{marginBottom: "5rem"}}>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                color: "var(--brand)",
              }}
            >
              — Upcoming
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: "clamp(28px,4vw,52px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--ink)",
              }}
            >
              Events worth
              <br />
              showing up for
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/validate">
              <motion.button
                whileHover={{ x: 4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--brand)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Validate Ticket <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <Spinner text="Loading events..." />
        ) : (
          <>
            {/* Featured */}
            {events[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: "2.5rem" }}
              >
                <Link to={`/events/${events[0]._id}`}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2.5rem",
                      borderRadius: "1.5rem",
                      border: "1px solid var(--border)",
                      padding: "2.5rem",
                      backgroundColor: "var(--bg-card)",
                      cursor: "pointer",
                    }}
                  >
                    {/* Left */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "999px",
                            backgroundColor: "var(--brand-muted)",
                            color: "var(--brand)",
                          }}
                        >
                          Featured
                        </span>

                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--muted)",
                          }}
                        >
                          {events[0].price === 0
                            ? "Free"
                            : `₦${events[0].price.toLocaleString()}`}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: "clamp(22px,3vw,36px)",
                          fontWeight: 700,
                          marginBottom: "1rem",
                          color: "var(--ink)",
                        }}
                      >
                        {events[0].title}
                      </h3>

                      <p
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                          marginBottom: "2rem",
                          maxWidth: "32rem",
                          color: "var(--muted)",
                        }}
                      >
                        {events[0].description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1.25rem",
                          fontSize: "0.85rem",
                          color: "var(--muted)",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                          }}
                        >
                          <Calendar size={14} />{" "}
                          {new Date(events[0].date).toDateString()}
                        </span>

                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                          }}
                        >
                          <MapPin size={14} /> {events[0].location}
                        </span>

                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                          }}
                        >
                          <Users size={14} /> {events[0].availableSlots} spots
                        </span>
                      </div>
                    </div>

                    {/* Right */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "5rem",
                          height: "5rem",
                          borderRadius: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "var(--brand-muted)",
                        }}
                      >
                        <Zap size={28} style={{ color: "var(--brand)" }} />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          backgroundColor: "var(--brand)",
                          color: "white",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "999px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        Register <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2rem",
              }}
            >
              {events.slice(1).map((event, i) => (
                <EventCard key={event._id} event={event} index={i} />
              ))}
            </div>

            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <Link to="/events">
                <button
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    margin: "0 auto",
                    color: "var(--brand)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View all events <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default EventsHome