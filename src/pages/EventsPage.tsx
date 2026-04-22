import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import EventCard from '../components/ui/EventCard';
import Spinner from '../components/ui/Spinner';
import { getAllEvents } from '../api';
import type { Event } from '../types';

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
      .then((res) => { setEvents(res.data.data); setFiltered(res.data.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let r = [...events];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
    }
    if (cat !== 'All') r = r.filter((e) => e.category === cat);
    if (price === 'free') r = r.filter((e) => e.price === 0);
    if (price === 'paid') r = r.filter((e) => e.price > 0);
    setFiltered(r);
  }, [search, cat, price, events]);

  const pill = (active: boolean) => ({
    backgroundColor: active ? 'var(--brand)' : 'var(--bg-card)',
    color: active ? '#ffffff' : 'var(--muted)',
    borderColor: active ? 'var(--brand)' : 'var(--border)',
  });

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
            Discover
          </p>
          <h1 className="font-bold text-5xl mb-4" style={{ color: 'var(--ink)' }}>All Events</h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            {events.length} events available — find yours and register in seconds.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} className="mb-10 space-y-4">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Search events or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--ink)' }}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={14} style={{ color: 'var(--muted)' }} />
            {CATS.map((c) => (
              <motion.button key={c} whileTap={{ scale: 0.95 }} onClick={() => setCat(c)}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
                style={pill(cat === c)}>{c}</motion.button>
            ))}
            <span className="w-px h-4 mx-1" style={{ backgroundColor: 'var(--border)' }} />
            {(['all', 'free', 'paid'] as const).map((p) => (
              <motion.button key={p} whileTap={{ scale: 0.95 }} onClick={() => setPrice(p)}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize"
                style={pill(price === p)}>
                {p === 'all' ? 'All Prices' : p.charAt(0).toUpperCase() + p.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <Spinner text="Loading events..." />
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--ink)' }}>No events found</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Try adjusting your filters</p>
          </motion.div>
        ) : (
          <>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event, i) => <EventCard key={event._id} event={event} index={i} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
