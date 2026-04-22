import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Ticket, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const links = [
  { label: 'Events', to: '/events' },
  { label: 'About', to: '/about' },
  { label: 'Validate', to: '/validate' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'var(--bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              <Zap size={15} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-xl tracking-tight" style={{ color: 'var(--ink)' }}>
              Momentis
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium transition-colors relative group"
                style={{ color: location.pathname === l.to ? 'var(--brand)' : 'var(--ink)' }}
              >
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--brand)',
                    width: location.pathname === l.to ? '100%' : '0%',
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'var(--brand-muted)', color: 'var(--brand)' }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>

            <Link to="/ticket-lookup">
              <button
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                style={{ color: 'var(--muted)' }}
              >
                <Ticket size={14} /> My Ticket
              </button>
            </Link>

            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                Register Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--brand-muted)', color: 'var(--brand)' }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 flex items-center justify-center rounded-lg"
              style={{ color: 'var(--ink)' }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b"
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {[...links, { label: 'My Ticket', to: '/ticket-lookup' }].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-3 px-3 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: location.pathname === l.to ? 'var(--brand)' : 'var(--ink)',
                    backgroundColor: location.pathname === l.to ? 'var(--brand-muted)' : 'transparent',
                  }}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/events" className="mt-2">
                <button
                  className="w-full text-white font-semibold py-3 rounded-full"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  Register Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
