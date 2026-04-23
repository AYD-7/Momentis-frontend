import { Link } from 'react-router-dom';
import { Zap, Mail, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)', padding: "1.5rem"}}
    >
      <div className="max-w-6xl mx-auto px-6 py-16" style={{marginInline: "auto"}}>
        <div className="flex flex-wrap justify-between gap-6 md:gap-0">

          {/* Momentis */}
          <div className='flex flex-col gap-4 lg:w-1/3 '>
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

          {/* Platform */}
          <div className='flex flex-col gap-2 lg:gap-4'>
            <h4 className="font-semibold lg:text-normal uppercase tracking-widest mb-4"
              style={{ color: 'var(--brand)' }}>Platform</h4>
            <ul className="space-y-3">
              {[
                { label: 'Browse Events', to: '/events' },
                { label: 'My Ticket', to: '/ticket-lookup' },
                { label: 'Validate Ticket', to: '/validate' },
                { label: 'About', to: '/about' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm transition-colors duration-300 hover:opacity-80"
                    style={{ color: 'var(--muted)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className='lg:w-1/3 flex flex-col gap-2 lg:gap-4'>
            <h4 className="font-semibold lg:text-normal uppercase tracking-widest mb-4 flex gap-2 items-center"
              style={{ color: 'var(--brand)' }}>Built With <Heart size={14} /></h4>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              React · TypeScript · Tailwind CSS · Node.js · Express · MongoDB  
            </p>
            <div className="flex gap-3">
              <a href="ayodejiaronimo.vercel.app" rel='noreferrer noopener' target='_blank' className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:opacity-80"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <ExternalLink size={14} />
              </a>
              <a href="mailto:ayodejiaronimo@gmail.com" className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:opacity-80"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                <Mail size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border)', marginTop: "3rem" }}>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>&copy; {new Date().getFullYear()} Momentis. All rights reserved.</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>By: {" "}<a href="ayodejiaronimo.vercel.app" rel='noreferrer noopener' target='_blank' style={{color: "var(--brand)"}}>A*Y*D</a></p>
        </div>
      </div>
    </footer>
  );
}
