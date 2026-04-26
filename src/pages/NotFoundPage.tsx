import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: 'var(--bg)',
        padding: "0 1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* LOOPING 404 */}
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="font-bold leading-none select-none"
          style={{
            fontSize: "120px",
            marginBottom: "1rem",
            color: 'var(--brand-muted)',
          }}
        >
          404
        </motion.p>

        <h1
          className="font-bold text-3xl"
          style={{
            marginBottom: "0.75rem",
            color: 'var(--ink)',
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            marginBottom: "2rem",
            maxWidth: "24rem",
            marginLeft: "auto",
            marginRight: "auto",
            color: 'var(--muted)',
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-white font-semibold rounded-full"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: 'var(--brand)',
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}