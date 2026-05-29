import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ArrowLeft, Download, Activity, ShieldAlert } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const TiltCard = ({ children, className }) => (
  <motion.div
    whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={className}
    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
  >
    {children}
  </motion.div>
);

const ThreatAnalysis = ({ inlineData }) => {
  const location = useLocation();
  const data = inlineData || location.state || {
    filename: 'suspect_call.mp3',
    filesize: '2.4 MB',
    duration: '00:45',
    confidence: 98.4,
    verdict: 'SYNTHETIC',
    threat_score: 98,
  };

  const isSynthetic = data.verdict === 'SYNTHETIC';

  const indicators = [
    { label: 'Abnormal Pitch Patterns', severity: 'Rising', color: '#ef4444' },
    { label: 'Spectral Irregularities', severity: 'Rising', color: '#ef4444' },
    { label: 'Synthesis Artifacts', severity: 'Rising', color: '#ef4444' },
    { label: 'MFCC Discontinuities', severity: 'Medium', color: '#f59e0b' },
    { label: 'Voice Naturalness', severity: 'Low', color: '#10b981' },
  ];

  return (
    <motion.div className="max-w-6xl mx-auto px-6 py-10 w-full"
      variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Back (Only if standalone route) */}
      {!inlineData && (
        <Link to="/detect" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Detection
        </Link>
      )}

      {/* Alert Banner */}
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5 mb-8 flex items-center gap-4"
        style={{
          background: isSynthetic ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
          border: `1px solid ${isSynthetic ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
        }}>
        {isSynthetic
          ? <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
          : <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />}
        <div>
          <div className="text-xl font-bold" style={{ color: isSynthetic ? '#ef4444' : '#10b981' }}>
            {isSynthetic ? '⚠ SYNTHETIC VOICE DETECTED' : '✓ AUTHENTIC VOICE'}
          </div>
          <p className="text-slate-400 text-sm mt-0.5">
            {isSynthetic
              ? 'High confidence. This voice shows strong indicators of AI generation.'
              : 'Low confidence of synthetic generation. Voice appears authentic.'}
          </p>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Risk Gauge */}
        <TiltCard className="card p-7 flex flex-col items-center justify-center text-center">
          {/* Circle gauge */}
          <div className="relative w-40 h-40 mb-4">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
              <circle cx="60" cy="60" r="50" fill="none"
                stroke={isSynthetic ? '#ef4444' : '#10b981'}
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - data.confidence / 100)}`}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 8px ${isSynthetic ? '#ef4444' : '#10b981'})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold" style={{ color: isSynthetic ? '#ef4444' : '#10b981' }}>
                {data.confidence}%
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Confidence</div>
            </div>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
            style={{ background: isSynthetic ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', color: isSynthetic ? '#ef4444' : '#10b981' }}>
            {isSynthetic ? 'CRITICAL' : 'SAFE'}
          </div>
          <p className="text-xs text-slate-500">Risk Level</p>

          {/* Score bar */}
          <div className="w-full mt-5">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Threat Score</span>
              <span className="font-mono font-bold text-white">{data.threat_score} / 100</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${data.threat_score}%`,
                  background: isSynthetic ? 'linear-gradient(90deg, #dc2626, #ef4444)' : '#10b981',
                  boxShadow: isSynthetic ? '0 0 10px rgba(239,68,68,0.6)' : '0 0 10px rgba(16,185,129,0.6)',
                }} />
            </div>
          </div>
        </TiltCard>

        {/* Key Indicators */}
        <TiltCard className="card p-7 lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h3 className="font-bold text-white">Key Indicators</h3>
          </div>
          <div className="space-y-3">
            {indicators.map((ind, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                <span className="text-sm text-slate-300">{ind.label}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${ind.color}18`, color: ind.color }}>
                  {ind.severity}
                </span>
              </div>
            ))}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/5">
            {[
              { label: 'Audio File', value: data.filename },
              { label: 'Duration', value: data.duration },
              { label: 'Model', value: 'DeepShield v2.1' },
            ].map(m => (
              <div key={m.label}>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-xs font-mono text-slate-300 truncate">{m.value}</p>
              </div>
            ))}
          </div>
        </TiltCard>
      </div>

      {/* Waveform / Spectrogram / Frequency row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {['Waveform', 'Spectrogram', 'Frequency Analysis'].map((label, idx) => (
          <TiltCard key={label} className="card p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{label}</p>
            <div className="h-20 flex items-end gap-0.5">
              {[...Array(60)].map((_, i) => {
                const h = idx === 0
                  ? Math.abs(Math.sin(i * 0.4)) * 80 + 10
                  : idx === 1
                  ? Math.random() * 80 + 10
                  : Math.max(10, 90 - i * 1.2);
                return (
                  <div key={i} className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: idx === 0 ? '#3b82f6' : idx === 1 ? `hsl(${200 + h}, 80%, 55%)` : '#8b5cf6',
                      opacity: 0.8,
                    }}
                  />
                );
              })}
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Meta row + download */}
      <TiltCard className="flex flex-wrap gap-4 justify-between items-center p-5 card">
        <div className="flex flex-wrap gap-8 text-xs text-slate-500">
          {[
            ['Audio Source', data.filename],
            ['Sample Rate', '44.1 kHz'],
            ['Channels', 'Mono'],
            ['Bitrate', '128 kbps'],
            ['AI Model', 'DeepShield v2.1'],
            ['Analysis Time', '1.2s'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="uppercase tracking-widest mb-0.5" style={{ color: 'rgba(148,163,184,0.4)' }}>{k}</p>
              <p className="text-slate-300 font-mono">{v}</p>
            </div>
          ))}
        </div>
        <button className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </TiltCard>

    </motion.div>
  );
};

export default ThreatAnalysis;
