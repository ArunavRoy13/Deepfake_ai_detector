import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import VoiceUpload from '../components/ui/VoiceUpload';
import VoiceRecorder from '../components/ui/VoiceRecorder';

/* ── Animation preset ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ── Waveform SVG bars ─────────────────────────────────────── */
const WaveformBars = ({ count = 48, color, style = {} }) => {
  const heights = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const t = i / count;
      const env = Math.exp(-Math.pow((t - 0.5) * 3, 2));
      return 10 + env * 90 * (0.4 + 0.6 * Math.abs(Math.sin(i * 1.7)));
    }), [count]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', height: 48, ...style }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            flex: 1,
            height: `${h}%`,
            background: color,
            opacity: 0.85,
            animationDelay: `${i * 0.025}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ── Section eyebrow ───────────────────────────────────────── */
const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
    <div style={{ width: 28, height: 2, background: '#38bdf8' }} />
    <span className="mono" style={{ color: '#7dd3fc' }}>{children}</span>
  </div>
);

/* ── Stat pill ─────────────────────────────────────────────── */
const StatPill = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
    <div className="mono" style={{ color: '#64748b', marginTop: 6 }}>{label}</div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   LANDING PAGE
═══════════════════════════════════════════════════════════ */
const LandingPage = () => {
  const [activeInput, setActiveInput]     = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing]     = useState(false);

  const handleResult = (result) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════
          HERO  
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 620, overflow: 'hidden', background: '#ffffff' }}>

        {/* Hero Image */}
        <img
          src="/hero-light.png"
          alt="AI Voice Waveform"
          className="hero-pan"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'right center',
            pointerEvents: 'none', userSelect: 'none',
          }}
        />

        {/* White fade mask to keep text legible on the left */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.95) 30%, transparent 55%)',
        }} />

        {/* Bottom fade for seamless transition */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, transparent 75%, rgba(255,255,255,0.8) 90%, #ffffff 100%)',
        }} />

        {/* ── Text panel ───────────────────────────────── */}
        <div style={{
          position: 'absolute',
          top: 60, left: 0, bottom: 0,
          width: 'min(560px, 50vw)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 0 0 6vw',
          zIndex: 20,
        }}>

          {/* Eyebrow badge */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.1)',
              padding: '5px 14px', marginBottom: 32, backdropFilter: 'blur(10px)',
              borderRadius: 4
            }}>
              <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', boxShadow: '0 0 10px #3b82f6' }} />
              <span className="mono" style={{ color: '#0f172a' }}>AI-Powered Voice Intelligence</span>
            </div>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom: 28 }}>
            {[
              { text: 'CAN YOU',       accent: false },
              { text: 'TRUST A VOICE', accent: false },
              { text: "YOU CAN'T",     accent: false },
              { text: 'VERIFY?',       accent: true  },
            ].map(({ text, accent }, i) => (
              <motion.div key={i}
                initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.18 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <h1 style={{
                  fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.045em',
                  textTransform: 'uppercase',
                  margin: 0,
                  color: accent ? 'transparent' : '#0f172a',
                  backgroundImage: accent ? 'linear-gradient(95deg, #1e3a8a 0%, #2563eb 45%, #3b82f6 100%)' : 'none',
                  WebkitBackgroundClip: accent ? 'text' : 'unset',
                  WebkitTextFillColor: accent ? 'transparent' : '#0f172a',
                  backgroundClip: accent ? 'text' : 'unset',
                  textShadow: 'none',
                }}>
                  {text}
                </h1>
              </motion.div>
            ))}
          </div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.72, marginBottom: 36, maxWidth: 360, textShadow: 'none' }}
          >
            DeepShield Sentinel AI detects deepfake voice scams, synthetic speech
            attacks, and voice impersonation before damage is done.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}
          >
            <button
              className="btn-primary"
              style={{ position: 'relative', overflow: 'hidden', boxShadow: '0 0 32px rgba(36,84,216,0.35)' }}
              onClick={() => document.getElementById('detect-lab')?.scrollIntoView({ behavior: 'smooth' })}
            >
              START ANALYSIS
              <svg width="12" height="9" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn-outline" style={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.02)' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="6" height="7" viewBox="0 0 8 10" fill="currentColor"><polygon points="2,1 7,5 2,9"/></svg>
              </span>
              WATCH DEMO
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.92 }}
            style={{ display: 'flex', gap: 36, marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.05)' }}
          >
            {[['99.3%', 'ACCURACY'], ['<180ms', 'RESPONSE'], ['12M+', 'ANALYZED']].map(([v, l]) => (
              <StatPill key={l} value={v} label={l} />
            ))}
          </motion.div>
        </div>

        {/* ── Floating forensic labels (bottom-right corner) ── */}
        <div style={{
          position: 'absolute', bottom: 60, right: '5%', zIndex: 20,
          display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end',
        }}>
          {[
            { k: 'VOICEPRINT ID',  v: 'VX-34291',    c: '#0f172a',  dim: true },
            { k: 'THREAT SCORE',   v: '0.92',         c: '#ef4444',  dim: false },
            { k: 'MODEL',          v: 'SENTINEL V2.3',c: '#0f172a',  dim: true },
            { k: 'STATUS',         v: 'ANALYZING...', c: '#2563eb',  dim: false },
          ].map(({ k, v, c, dim }) => (
            <motion.div key={k}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              style={{
                background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,0,0,0.06)',
                padding: '8px 14px', textAlign: 'right',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
              }}
            >
              <div className="mono" style={{ color: '#64748b', marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c, letterSpacing: '0.08em' }}>{v}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Scroll indicator ── */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span className="mono" style={{ color: '#64748b' }}>SCROLL</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #64748b, transparent)' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROCESS PIPELINE
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#f8fafc', padding: '100px 6vw', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <motion.div {...fadeUp(0)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: '#2563eb' }} />
              <span className="mono" style={{ color: '#2563eb', letterSpacing: '0.15em' }}>OUR PROCESS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: 56 }}>
              Six-stage forensic pipeline
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {[
              { n: '01', label: 'VOICE INPUT',         sub: 'Upload or record suspicious audio through secure WebSocket or REST endpoints.',         icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg> },
              { n: '02', label: 'PREPROCESSING',       sub: 'Advanced noise reduction, silence truncation, and waveform normalization.',        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
              { n: '03', label: 'FEATURE EXTRACTION',  sub: 'Mapping deep acoustic features including Mel-frequency cepstral coefficients.',             icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg> },
              { n: '04', label: 'AI ANALYSIS',         sub: 'Evaluation across 12+ specialized models covering GAN and diffusion artifacts.',            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
              { n: '05', label: 'ANOMALY DETECTION',   sub: 'Spectral anomaly scanning to detect imperceptible synthetic signatures.',        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
              { n: '06', label: 'VERDICT',              sub: 'Final forensic verdict returned with confidence scores in under 180ms.', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
            ].map((step, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} style={{
                position: 'relative', overflow: 'hidden',
                padding: '36px 32px', borderRadius: 4,
                display: 'flex', flexDirection: 'column',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.03)',
                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(37,99,235,0.08)'; e.currentTarget.style.borderColor = 'rgba(37,99,235,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
              >
                {/* Huge faded background number */}
                <div style={{
                  position: 'absolute', top: -30, right: -15,
                  fontSize: 140, fontWeight: 900, lineHeight: 1,
                  color: 'rgba(15,23,42,0.03)',
                  fontFamily: 'Inter, sans-serif',
                  pointerEvents: 'none',
                }}>
                  {step.n}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(37,99,235,0.08)',
                    border: '1px solid rgba(37,99,235,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#2563eb',
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="mono" style={{ color: '#2563eb', fontSize: 10, marginBottom: 2 }}>STEP {step.n}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.05em', color: '#0f172a' }}>{step.label}</div>
                  </div>
                </div>

                <div style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6, marginTop: 'auto', position: 'relative', zIndex: 2 }}>
                  {step.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#f8fafc', padding: '80px 6vw', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <motion.div {...fadeUp()} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 2, background: '#2563eb' }} />
                <span className="mono" style={{ color: '#2563eb', letterSpacing: '0.15em' }}>WHY DEEPSHIELD</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
                Built for the threats <br /><span className="gradient-text">you can't see coming</span>
              </h2>
            </div>
            <Link to="/technology" className="btn-outline" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
              VIEW TECHNOLOGY
              <svg width="11" height="8" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '⚡', title: 'Real-Time Detection', body: 'Sub-180ms analysis with live streaming audio support for enterprise deployments.' },
              { icon: '🧠', title: 'Multi-Model AI', body: 'Ensemble of 12+ specialized models covering GAN, diffusion, and neural codec artifacts.' },
              { icon: '🔐', title: 'Zero Data Retention', body: 'Audio is processed in memory and never stored. Fully GDPR and HIPAA compliant.' },
              { icon: '📊', title: '99.3% Accuracy', body: 'Validated across 40+ voice synthesis systems including ElevenLabs, Voicify, and Resemble.' },
              { icon: '🌐', title: 'Enterprise API', body: 'REST and WebSocket APIs with SDK support for Python, Node.js, and mobile platforms.' },
              { icon: '🛡', title: 'Adversarial Robustness', body: 'Hardened against adversarial manipulation and obfuscation techniques used by threat actors.' },
            ].map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="card" style={{ padding: 28, borderRadius: 4 }}>
                <div style={{ fontSize: 26, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</div>
                <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.65 }}>{f.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DETECTION LAB
      ══════════════════════════════════════════════ */}
      <section id="detect-lab" style={{ background: '#ffffff', backgroundImage: 'radial-gradient(ellipse at top right, rgba(239,68,68,0.03) 0%, #ffffff 70%)', padding: '80px 6vw', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <motion.div {...fadeUp()} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: '#ef4444' }} />
              <span className="mono" style={{ color: '#ef4444', letterSpacing: '0.15em' }}>LIVE ANALYSIS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
              Test a voice sample <span className="gradient-text">right now</span>
            </h2>
            <p style={{ fontSize: 14, color: '#475569', marginTop: 12, maxWidth: 480, lineHeight: 1.6 }}>
              Upload an audio file or record live — our AI will analyze it in under 200ms.
            </p>
          </motion.div>

          {/* Tab selector */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, border: '1px solid rgba(0,0,0,0.1)', width: 'fit-content' }}>
            {['upload', 'record'].map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveInput(tab); setAnalysisResult(null); }}
                style={{
                  padding: '10px 28px',
                  background: activeInput === tab ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' : 'transparent',
                  color: activeInput === tab ? '#fff' : '#64748b',
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9.5, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}
              >
                {tab === 'upload' ? '↑ UPLOAD FILE' : '● RECORD LIVE'}
              </button>
            ))}
          </div>

          {/* Components */}
          <AnimatePresence mode="wait">
            {activeInput === 'upload' && (
              <motion.div key="upload"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <VoiceUpload
                  onResult={handleResult}
                  onAnalyzing={() => setIsAnalyzing(true)}
                />
              </motion.div>
            )}
            {activeInput === 'record' && (
              <motion.div key="record"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <VoiceRecorder
                  onResult={handleResult}
                  onAnalyzing={() => setIsAnalyzing(true)}
                />
              </motion.div>
            )}
            {!activeInput && (
              <motion.div key="placeholder"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
              >
                {[
                  { icon: '↑', label: 'UPLOAD FILE', sub: 'MP3, WAV, FLAC — up to 50 MB', action: 'upload' },
                  { icon: '●', label: 'RECORD LIVE', sub: 'Real-time microphone capture', action: 'record' },
                ].map(t => (
                  <button key={t.action} onClick={() => setActiveInput(t.action)}
                    className="card"
                    style={{ padding: 32, cursor: 'pointer', textAlign: 'left', background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 20 }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(37,99,235,0.2)', background: 'rgba(37,99,235,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#2563eb', flexShrink: 0 }}>
                      {t.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0f172a', marginBottom: 6 }}>{t.label}</div>
                      <div className="mono" style={{ color: '#64748b' }}>{t.sub}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VERDICT / RESULTS
      ══════════════════════════════════════════════ */}
      <section id="results-section" style={{ background: '#f8fafc', padding: '80px 6vw', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <motion.div {...fadeUp()} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: '#10b981' }} />
              <span className="mono" style={{ color: '#10b981', letterSpacing: '0.15em' }}>ANALYSIS VERDICT</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
              {analysisResult ? 'Your result' : 'Instant forensic'}{' '}
              <span className="gradient-text">{analysisResult ? 'is ready' : 'breakdown'}</span>
            </h2>
          </motion.div>

          {/* Live result or demo card */}
          <AnimatePresence mode="wait">
            {analysisResult ? (
              <motion.div key="live-result"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
              >
                {/* Left: verdict */}
                <div className="card" style={{ padding: 36, borderRadius: 2 }}>
                  <div className="mono" style={{ color: '#64748b', marginBottom: 20 }}>DETECTION RESULT</div>
                  <div style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em',
                    textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 12,
                    color: analysisResult.label === 'REAL' ? '#10b981' : '#ef4444',
                  }}>
                    {analysisResult.label ?? 'UNKNOWN'}.
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 28 }}>
                    {Math.round((analysisResult.confidence ?? 0) * 100)}% CONFIDENCE
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      ['RISK LEVEL',       analysisResult.risk ?? 'UNKNOWN',    analysisResult.label === 'REAL' ? '#10b981' : '#ef4444'],
                      ['ANOMALY DETECTED', analysisResult.anomaly ?? 'NO',      analysisResult.label === 'REAL' ? '#10b981' : '#ef4444'],
                      ['MODEL',            analysisResult.model ?? 'SENTINEL',  '#475569'],
                    ].map(([k, v, c]) => (
                      <div key={k}>
                        <div className="mono" style={{ color: '#64748b', marginBottom: 4 }}>{k}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: c }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setAnalysisResult(null)}
                    className="btn-outline"
                    style={{ marginTop: 28, fontSize: 10, padding: '10px 20px' }}
                  >← ANALYZE ANOTHER</button>
                </div>

                {/* Right: waveform visual + confidence ring */}
                <div className="card" style={{ padding: 36, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 28 }}>
                  <div>
                    <div className="mono" style={{ color: '#64748b', marginBottom: 10 }}>VOICE WAVEFORM</div>
                    <WaveformBars color={analysisResult.label === 'REAL' ? '#10b981' : '#ef4444'} />
                  </div>
                  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5"/>
                        <circle cx="48" cy="48" r="40" fill="none"
                          stroke={analysisResult.label === 'REAL' ? '#10b981' : '#ef4444'}
                          strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 * (1 - (analysisResult.confidence ?? 0))}
                          style={{ filter: `drop-shadow(0 0 6px ${analysisResult.label === 'REAL' ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)'})` }}
                        />
                      </svg>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{Math.round((analysisResult.confidence ?? 0) * 100)}%</div>
                        <div className="mono" style={{ color: '#64748b', marginTop: 3 }}>CONF.</div>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="mono" style={{ color: '#64748b', marginBottom: 8 }}>SPECTRAL INDICATORS</div>
                      {(analysisResult.indicators ?? ['Neural codec artifacts', 'Phase inconsistency']).map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: analysisResult.label === 'REAL' ? '#10b981' : '#ef4444', flexShrink: 0 }} />
                          <div style={{ fontSize: 11.5, color: '#475569' }}>{s}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Demo mode — static example */
              <motion.div key="demo-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
              >
                <div className="card" style={{ padding: 36, borderRadius: 2 }}>
                  <div className="mono" style={{ color: '#64748b', marginBottom: 20 }}>EXAMPLE DETECTION RESULT</div>
                  <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 12, color: '#ef4444' }}>SYNTHETIC.</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 28 }}>92% CONFIDENCE</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[['RISK LEVEL', 'CRITICAL', '#ef4444'], ['ANOMALY DETECTED', 'YES', '#ef4444'], ['MODEL', 'SENTINEL V2.3', '#475569']].map(([k, v, c]) => (
                      <div key={k}>
                        <div className="mono" style={{ color: '#64748b', marginBottom: 4 }}>{k}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: c }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => document.getElementById('detect-lab')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary" style={{ marginTop: 28, fontSize: 10, padding: '11px 22px' }}>
                    TRY WITH YOUR VOICE
                    <svg width="10" height="8" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="card" style={{ padding: 36, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 28 }}>
                  <div>
                    <div className="mono" style={{ color: '#64748b', marginBottom: 10 }}>DETECTED VOICE WAVEFORM</div>
                    <WaveformBars color="#ef4444" />
                  </div>
                  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }} viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5"/>
                        <circle cx="48" cy="48" r="40" fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" strokeDasharray={251.2} strokeDashoffset={251.2 * 0.08} style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.5))' }}/>
                      </svg>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>92%</div>
                        <div className="mono" style={{ color: '#64748b', marginTop: 3 }}>CONF.</div>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="mono" style={{ color: '#64748b', marginBottom: 8 }}>SPECTRAL INDICATORS</div>
                      {['Neural codec artifacts', 'Phase inconsistency', 'Pitch quantization', 'GAN fingerprint'].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                          <div style={{ fontSize: 11.5, color: '#475569' }}>{s}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section className="section-glow-blue" style={{ padding: '100px 6vw', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>

          <motion.div {...fadeUp()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: '#2563eb' }} />
              <span className="mono" style={{ color: '#2563eb', letterSpacing: '0.15em' }}>DEEPSHIELD SENTINEL AI</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', color: '#0f172a', lineHeight: 0.9, marginBottom: 32 }}>
              VOICE FRAUD<br/>
              <span className="gradient-text">ENDS HERE.</span>
            </h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/detect" className="btn-primary" style={{ textDecoration: 'none' }}>
                START FREE ANALYSIS
                <svg width="12" height="9" viewBox="0 0 14 10" fill="none"><path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>BOOK A DEMO</Link>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['DETECTION ACCURACY', '99.3%'], ['AVG RESPONSE TIME', '< 180ms'], ['VOICE MODELS', '12+']].map(([l, v]) => (
              <div key={l} className="card" style={{ padding: '14px 20px', borderRadius: 4 }}>
                <div className="mono" style={{ color: '#64748b', marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
