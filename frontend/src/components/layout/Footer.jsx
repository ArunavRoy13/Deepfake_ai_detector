import { Link } from 'react-router-dom';
import { Shield, Twitter, Github, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Detection Engine', to: '/detect' },
    { label: 'Live Analysis', to: '/detect' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Reports', to: '/report' },
    { label: 'API Access', to: '#' },
    { label: 'Pricing', to: '#' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Contact', to: '/contact' },
    { label: 'Press', to: '#' },
  ],
  Resources: [
    { label: 'Documentation', to: '#' },
    { label: 'Guides', to: '#' },
    { label: 'Platform', to: '/technology' },
    { label: 'Threat Intel', to: '/intel' },
    { label: 'Help Center', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Cookie Policy', to: '#' },
    { label: 'Compliance', to: '#' },
  ],
};

const Footer = () => {
  return (
    <footer className="relative z-10 border-t" style={{ background: '#040C1A', borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(79,70,229,0.3))', border: '1px solid rgba(59,130,246,0.4)' }}>
                <svg width="15" height="17" viewBox="0 0 18 20" fill="none" className="text-blue-400">
                  <path d="M9 0L17.5 3.5V9.5C17.5 14.5 13.8 19.1 9 20C4.2 19.1 0.5 14.5 0.5 9.5V3.5L9 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 10L8 12L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">DeepShield</div>
                <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-blue-400">Sentinel AI</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(148,163,184,0.8)' }}>
              AI-powered voice authenticity platform protecting the world from deepfake scams and voice fraud attempts.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-white">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(148,163,184,0.75)' }}
                      onMouseEnter={e => e.target.style.color = '#ffffff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(148,163,184,0.75)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>
            © {new Date().getFullYear()} DeepShield Sentinel AI. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'rgba(148,163,184,0.5)' }}>
            Made with <span className="text-red-400">♥</span> by DeepShield Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
