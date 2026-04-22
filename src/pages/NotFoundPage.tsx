import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--bg)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="font-bold leading-none select-none mb-4"
          style={{ fontSize: '120px', color: 'var(--brand-muted)' }}
        >
          404
        </motion.p>
        <h1 className="font-bold text-3xl mb-3" style={{ color: 'var(--ink)' }}>Page not found</h1>
        <p className="mb-8 max-w-sm mx-auto" style={{ color: 'var(--muted)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full"
            style={{ backgroundColor: 'var(--brand)' }}>
            <ArrowLeft size={16} /> Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
