import { motion } from 'framer-motion';
import { Cpu, Network, Shield, Fingerprint, Activity, Zap, Database, Server } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const techFeatures = [
  {
    icon: <Activity className="w-5 h-5 text-blue-400" />,
    title: 'Audio Preprocessing',
    desc: 'Noise reduction, sample normalization, and acoustic environment isolation.',
    color: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.3)',
  },
  {
    icon: <Layers className="w-5 h-5 text-purple-400" />,
    title: 'Feature Extraction',
    desc: 'MFCCs, spectral centroid, zero-crossing rate, chroma, and 96 additional acoustic features.',
    color: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.3)',
  },
  {
    icon: <Network className="w-5 h-5 text-cyan-400" />,
    title: 'Deep Learning Model',
    desc: 'CNN + LSTM hybrid architecture trained on millions of real and synthetic voice samples.',
    color: 'rgba(6,182,212,0.15)',
    border: 'rgba(6,182,212,0.3)',
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-emerald-400" />,
    title: 'Decision Engine',
    desc: 'Multi-model ensemble voting with calibrated confidence scoring and real-time threat classification.',
    color: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.3)',
  },
];

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6 text-blue-400" />,
    title: 'End-to-End Encryption',
    desc: 'All data is encrypted in transit and at rest using AES-256 and TLS 1.3.',
  },
  {
    icon: <FileX className="w-6 h-6 text-purple-400" />,
    title: 'Secure File Handling',
    desc: 'Files are processed in isolated, sandboxed environments with zero persistent storage.',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
    title: 'No Data Retention',
    desc: 'Audio files are automatically deleted after analysis. We store zero raw voice data.',
  },
  {
    icon: <Award className="w-6 h-6 text-amber-400" />,
    title: 'Enterprise Grade',
    desc: 'Built to meet the highest enterprise security standards and compliance requirements.',
  },
];

const stats = [
  { value: '100+', label: 'Acoustic Features', sub: 'Extracted per sample' },
  { value: 'CNN + LSTM', label: 'Hybrid Architecture', sub: 'State-of-the-art' },
  { value: 'Millions', label: 'Voices Trained', sub: 'Across 120+ languages' },
  { value: '95%+', label: 'Model Accuracy', sub: 'Real-world validation' },
];

const badges = [
  { label: 'GDPR Compliant', color: 'rgba(59,130,246,0.2)', border: 'rgba(59,130,246,0.4)', text: '#60a5fa' },
  { label: 'ISO 27001 Certified', color: 'rgba(139,92,246,0.2)', border: 'rgba(139,92,246,0.4)', text: '#a78bfa' },
  { label: 'SOC 2 Type II', color: 'rgba(16,185,129,0.2)', border: 'rgba(16,185,129,0.4)', text: '#34d399' },
  { label: 'Privacy First', color: 'rgba(249,115,22,0.2)', border: 'rgba(249,115,22,0.4)', text: '#fb923c' },
];

const Technology = () => {
  return (
    <motion.div 
      className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 relative"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >

      {/* Main Header */}
      <motion.div variants={itemVariants} className="mb-16 text-center max-w-3xl mx-auto relative z-10">
        <div className="section-badge mb-4 mx-auto shadow-sm"><Cpu className="w-3.5 h-3.5" /> Platform Overview</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
          Advanced AI Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Enterprise Security</span>
        </h1>
        <p className="text-slate-200 text-lg drop-shadow-md font-medium">
          DeepShield combines state-of-the-art acoustic feature analysis with uncompromising data privacy to deliver a safe, accurate detection platform.
        </p>
      </motion.div>

      {/* Technology Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2 drop-shadow-md">
          <Activity className="w-6 h-6 text-blue-400" /> Core AI Architecture
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 items-center">
          
          {/* Neural sphere visualization */}
          <div className="flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-80 h-80">
              {/* Outer glow rings */}
              {[280, 240, 200, 160, 120].map((size, i) => (
                <div key={i} className="absolute rounded-full" style={{
                  width: size, height: size,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: `1px solid rgba(59,130,246,${0.04 + i * 0.03})`,
                  boxShadow: i === 0 ? '0 0 60px rgba(59,130,246,0.15)' : 'none',
                }} />
              ))}
              {/* Core sphere */}
              <div className="absolute rounded-full" style={{
                width: 110, height: 110,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle at 35% 35%, rgba(96,165,250,0.8), rgba(79,70,229,0.6), rgba(5,13,26,0.9))',
                boxShadow: '0 0 40px rgba(59,130,246,0.5), 0 0 80px rgba(79,70,229,0.3), inset 0 0 20px rgba(255,255,255,0.1)',
              }}>
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle at 60% 60%, transparent, rgba(5,13,26,0.4))',
                }} />
              </div>
              {/* Orbit nodes */}
              {[
                { angle: 0, dist: 100, color: '#3b82f6' },
                { angle: 72, dist: 110, color: '#8b5cf6' },
                { angle: 144, dist: 95, color: '#06b6d4' },
                { angle: 216, dist: 105, color: '#10b981' },
                { angle: 288, dist: 100, color: '#f59e0b' },
              ].map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = 50 + (node.dist / 2.8) * Math.cos(rad);
                const y = 50 + (node.dist / 2.8) * Math.sin(rad);
                return (
                  <div key={i} className="absolute w-3 h-3 rounded-full"
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      background: node.color,
                      boxShadow: `0 0 10px ${node.color}`,
                    }} />
                );
              })}
              {/* Connection lines SVG */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                {[0, 72, 144, 216, 288].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const dist = [100, 110, 95, 105, 100][i];
                  const x2 = 50 + (dist / 2.8) * Math.cos(rad);
                  const y2 = 50 + (dist / 2.8) * Math.sin(rad);
                  return (
                    <line key={i} x1="50%" y1="50%"
                      x2={`${x2}%`} y2={`${y2}%`}
                      stroke={['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i]}
                      strokeWidth="0.8" strokeOpacity="0.4" />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Tech Feature list */}
          <div className="flex flex-col gap-5 order-1 lg:order-2">
            {techFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:translate-x-1"
                style={{ background: f.color, border: `1px solid ${f.border}` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(5,13,26,0.7)', border: `1px solid ${f.border}` }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 drop-shadow-md">{f.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium drop-shadow-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-20 shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.1)' }}>
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center justify-center py-7 px-4 text-center backdrop-blur-xl"
            style={{ background: 'rgba(2, 6, 23, 0.85)' }}>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1"
              style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {s.value}
            </div>
            <div className="text-sm font-bold text-slate-300 mb-0.5">{s.label}</div>
            <div className="text-xs text-slate-400">{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Security Section */}
      <motion.div variants={itemVariants} className="pt-10 border-t border-white/10">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2 drop-shadow-md">
          <Shield className="w-6 h-6 text-emerald-400" /> Enterprise Security
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          
          {/* Security Feature list */}
          <div className="flex flex-col gap-5">
            {securityFeatures.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="flex gap-4 p-5 glass-panel rounded-2xl hover:border-blue-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 drop-shadow-md">{f.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium drop-shadow-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Shield visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-72 h-72">
              {/* Glow rings */}
              {[260, 210, 160].map((size, i) => (
                <div key={i} className="absolute rounded-full animate-pulse-slow"
                  style={{
                    width: size, height: size,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid rgba(16,185,129,${0.07 + i * 0.05})`,
                    animationDelay: `${i * 0.5}s`,
                  }} />
              ))}
              {/* Main shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-40 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(170deg, rgba(16,185,129,0.3), rgba(5,150,105,0.2))',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    boxShadow: '0 0 60px rgba(16,185,129,0.4)',
                  }}>
                  <Shield className="w-16 h-16 text-emerald-400 opacity-90" style={{ filter: 'drop-shadow(0 0 12px rgba(16,185,129,0.8))' }} />
                </div>
              </div>
              {/* Check marks orbiting */}
              {[0, 90, 180, 270].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 42 * Math.cos(rad);
                const y = 50 + 42 * Math.sin(rad);
                return (
                  <div key={i} className="absolute w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(16,185,129,0.15)',
                      border: '1px solid rgba(16,185,129,0.4)',
                    }}>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {badges.map((b, i) => (
            <div key={i} className="px-5 py-2.5 rounded-full text-sm font-bold tracking-wide drop-shadow-md backdrop-blur-md"
              style={{ background: b.color, border: `1px solid ${b.border}`, color: b.text }}>
              ✓ {b.label}
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Technology;
