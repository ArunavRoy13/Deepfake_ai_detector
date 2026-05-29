import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { label: 'LIVE SCANNER', to: '/detect' },
    { label: 'ARCHITECTURE', to: '/architecture' },
    { label: 'SECURITY',     to: '/security' },
    { label: 'RESEARCH',     to: '/research' },
    { label: 'TEAM',         to: '/team' },
  ];

  return (
    <>
      {/* Floating Navbar Container */}
      <div style={{
        position: 'fixed', top: scrolled ? 12 : 24, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'center',
        padding: '0 4vw',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        <nav style={{
          width: '100%', maxWidth: 1400, height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
          background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 100,
          boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.4s ease',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(37,99,235,0.1))',
              border: '1px solid rgba(96,165,250,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="12" height="14" viewBox="0 0 14 16" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round">
                <path d="M7 1L13 3.8V7.6C13 11.2 10.4 14.4 7 15C3.6 14.4 1 11.2 1 7.6V3.8L7 1Z"/>
                <path d="M4.5 8L6.2 9.7L9.5 6.4"/>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 900, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1 }}>DeepShield</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 6.5, letterSpacing: '0.2em', color: '#2563eb', marginTop: 3 }}>SENTINEL AI</div>
            </div>
          </Link>

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {links.map(l => (
              <Link key={l.label} to={l.to} style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
                textDecoration: 'none',
                color: location.pathname === l.to ? '#0f172a' : '#64748b',
                textShadow: location.pathname === l.to ? '0 0 12px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#0f172a'}
              onMouseLeave={e => e.target.style.color = location.pathname === l.to ? '#0f172a' : '#64748b'}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
            <Link to="/login" style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
              color: '#64748b', textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#0f172a'}
            onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              SIGN IN
            </Link>
            <Link to="/register" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(90deg, rgba(37,99,235,0.8), rgba(29,78,216,0.8))',
              border: '1px solid rgba(96,165,250,0.4)',
              borderRadius: 30,
              color: '#fff', textDecoration: 'none',
              padding: '7px 18px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              boxShadow: '0 0 20px rgba(37,99,235,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(59,130,246,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(37,99,235,0.8), rgba(29,78,216,0.8))';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(37,99,235,0.3)';
            }}
            >
              REQUEST ACCESS
              <svg width="10" height="8" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: 'fixed', top: 60, inset: 0, background: '#ffffff', zIndex: 49, padding: '32px 6vw', display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            {links.map(l => (
              <Link key={l.label} to={l.to} style={{ padding: '18px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#0f172a', textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <Link to="/login" style={{ flex: 1, textAlign: 'center', padding: '13px', border: '1px solid rgba(0,0,0,0.12)', color: '#0f172a', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>SIGN IN</Link>
              <Link to="/register" style={{ flex: 1, textAlign: 'center', padding: '13px', background: '#2563eb', color: '#fff', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>REQUEST ACCESS</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
