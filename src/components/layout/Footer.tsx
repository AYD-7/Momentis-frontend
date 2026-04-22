import { Link } from 'react-router-dom';
import { Zap, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--brand)' }}>
                <Zap size={15} className="text-white" fill="white" />
              </div>
              <span className="font-bold text-xl" style={{ color: 'var(--ink)' }}>Momentis</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              A full-stack event registration platform. Register, get your QR ticket, and show up.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--muted)' }}>Platform</h4>
            <ul className="space-y-3">
              {[
                { label: 'Browse Events', to: '/events' },
                { label: 'My Ticket', to: '/ticket-lookup' },
                { label: 'Validate Ticket', to: '/validate' },
                { label: 'About', to: '/about' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm transition-colors hover:opacity-80"
                    style={{ color: 'var(--muted)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--muted)' }}>Built With</h4>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              Node.js · Express · MongoDB · React · TypeScript · Tailwind CSS
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:opacity-80"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <ExternalLink size={14} />
              </a>
              <a href="mailto:hello@momentis.app" className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:opacity-80"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <Mail size={14} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>© 2025 Momentis. All rights reserved.</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Capstone Project — Full Stack Development</p>
        </div>
      </div>
    </footer>
  );
}
