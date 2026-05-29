import { motion } from 'framer-motion';
import { Shield, Radio, PhoneOff, Database, AlertTriangle, BookOpen, Globe, TrendingUp } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cards = [
  {
    icon: <PhoneOff className="w-6 h-6 text-blue-400" />,
    title: 'What is vishing?',
    desc: 'Vishing (voice phishing) is a social engineering attack where attackers use phone calls to deceive victims into divulging sensitive information or OTPs, banking details, and credentials.',
    color: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.25)',
    cta: 'Learn More',
  },
  {
    icon: <Radio className="w-6 h-6 text-red-400" />,
    title: 'Deepfake Voice Scams',
    desc: 'AI-generated voices mimic real people — family members, CEOs, or officials — to create convincing audio scams targeting individuals and enterprises at massive scale.',
    color: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.2)',
    cta: 'Learn More',
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
    title: 'Attack Lifecycle',
    desc: 'From impersonation to infiltration, understanding the full kill-chain of voice fraud attacks — target selection, voice cloning, pretexting, and exfiltration.',
    color: 'rgba(139,92,246,0.1)',
    border: 'rgba(139,92,246,0.2)',
    cta: 'Learn More',
  },
  {
    icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
    title: 'Real-World Cases',
    desc: 'High-profile incidents where voice deepfakes caused significant financial or reputational damage — learn the patterns so your organization can stay protected.',
    color: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
    cta: 'Learn More',
  },
];

const threats = [
  { region: 'North America', pct: 38 },
  { region: 'Europe', pct: 28 },
  { region: 'Asia Pacific', pct: 19 },
  { region: 'Middle East', pct: 11 },
  { region: 'South America', pct: 4 },
];

const ThreatIntelligence = () => {
  return (
    <motion.div className="max-w-7xl mx-auto px-6 py-10 w-full"
      variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="section-badge mb-4"><Shield className="w-3.5 h-3.5" /> Threat Intelligence</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Stay Ahead of Voice Fraud</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Explore the latest intelligence on AI-generated, voice-based cyber threats — updated in real time from our global sensor network.
        </p>
      </motion.div>

      {/* 4 Info Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((card, i) => (
          <div key={i} className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
            style={{ background: card.color, border: `1px solid ${card.border}` }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(5,13,26,0.6)', border: `1px solid ${card.border}` }}>
              {card.icon}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-2">{card.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors mt-auto self-start flex items-center gap-1">
              {card.cta} →
            </button>
          </div>
        ))}
      </motion.div>

      {/* Map + Threats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Global Threat Map */}
        <div className="card p-7 lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white">Global Threat Map</h3>
          </div>
          {/* Stylized world map SVG placeholder */}
          <div className="relative h-64 w-full rounded-xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(5,13,26,0.9), rgba(8,18,38,0.9))', border: '1px solid rgba(255,255,255,0.05)' }}>
            {/* Background grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 600 300">
              {[...Array(12)].map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#3b82f6" strokeWidth="0.5" />)}
              {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#3b82f6" strokeWidth="0.5" />)}
            </svg>
            {/* Hot spots */}
            {[
              { x: '22%', y: '30%', size: 18, pulse: true },
              { x: '46%', y: '25%', size: 14, pulse: true },
              { x: '68%', y: '40%', size: 12, pulse: false },
              { x: '80%', y: '30%', size: 10, pulse: false },
              { x: '30%', y: '70%', size: 8, pulse: false },
              { x: '55%', y: '60%', size: 10, pulse: true },
            ].map((dot, i) => (
              <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: dot.x, top: dot.y }}>
                {dot.pulse && <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ background: '#ef4444', width: dot.size, height: dot.size }} />}
                <div className="rounded-full" style={{ width: dot.size, height: dot.size, background: 'radial-gradient(circle, #ef4444, #dc2626)', boxShadow: '0 0 10px rgba(239,68,68,0.6)' }} />
              </div>
            ))}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> Active Threat</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> Monitored</span>
            </div>
          </div>
        </div>

        {/* Top Threats Table */}
        <div className="card p-7">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white">Top Threats</h3>
          </div>
          <div className="space-y-4">
            {threats.map((t, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5 text-sm">
                  <span className="text-slate-300">{t.region}</span>
                  <span className="font-mono font-bold text-white">{t.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${t.pct}%`,
                      background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#3b82f6',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-xs text-slate-600 uppercase tracking-widest mb-3">Attack Types</p>
            {[
              { label: 'CEO Fraud', pct: 45, color: '#ef4444' },
              { label: 'Bank Impersonation', pct: 30, color: '#f59e0b' },
              { label: 'Family Scam', pct: 25, color: '#8b5cf6' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: a.color }} />
                <span className="text-xs text-slate-400 flex-1">{a.label}</span>
                <span className="text-xs font-mono text-slate-300">{a.pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ThreatIntelligence;
