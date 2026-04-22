import { motion } from 'framer-motion';

export default function Spinner({ text = '' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="w-9 h-9 border-2 rounded-full"
        style={{ borderColor: 'var(--border)', borderTopColor: 'var(--brand)' }}
      />
      {text && <p className="text-sm" style={{ color: 'var(--muted)' }}>{text}</p>}
    </div>
  );
}
