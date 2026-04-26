import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../../components/ui/EventCard';
import Spinner from '../../components/ui/Spinner';
import { getAllEvents } from '../../api';
import type { Event } from '../../types';
import HeaderEvents from './components/HeaderEvents';
import FiltersEvents from './components/FiltersEvents';

const CATS = ['All', 'Technology', 'Business', 'Design', 'Music', 'Sports', 'Health', 'Education', 'Other'];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filtered, setFiltered] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [price, setPrice] = useState<'all' | 'free' | 'paid'>('all');

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        setEvents(res.data.data);
        setFiltered(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let r = [...events];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
      );
    }
    if (cat !== 'All') r = r.filter((e) => e.category === cat);
    if (price === 'free') r = r.filter((e) => e.price === 0);
    if (price === 'paid') r = r.filter((e) => e.price > 0);
    setFiltered(r);
  }, [search, cat, price, events]);

 

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      <div
        className="px-6"
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <HeaderEvents eventsCount={events.length} />

        {/* FILTERS */}
        <FiltersEvents
          search={search}
          setSearch={setSearch}
          cat={cat}
          setCat={setCat}
          price={price}
          setPrice={setPrice}
          CATS={CATS}
        />

        {/* CONTENT */}
        {loading ? (
          <Spinner text="Loading events..." />
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
            style={{ padding: "5rem 0" }}
          >
            <p className="text-4xl mb-4">🔍</p>
            <h3
              className="font-bold text-xl mb-2"
              style={{ color: "var(--ink)" }}
            >
              No events found
            </h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Try adjusting your filters
            </p>
          </motion.div>
        ) : (
          <>
            <p
              className="text-sm"
              style={{ color: "var(--muted)", marginBottom: "1.5rem" }}
            >
              {filtered.length} event
              {filtered.length !== 1 ? "s" : ""} found
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filtered.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}