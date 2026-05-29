import { motion } from 'framer-motion';
import { Shield, Cpu, Globe, Users, Zap, Activity } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const values = [
  {
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    title: 'Advanced AI',
    desc: 'State-of-the-art models to detect real and synthetic voice with unmatched accuracy.',
    color: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: 'Real-Time Protection',
    desc: 'Instant analysis before damage is done. Results in under 2.6 seconds.',
    color: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
  },
  {
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
    title: 'Global Impact',
    desc: 'Protecting individuals and enterprises dedicated to digital safety in 120+ countries.',
    color: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    icon: <Users className="w-6 h-6 text-purple-400" />,
    title: 'Built by Experts',
    desc: 'Cybersecurity and AI professionals dedicated to digital safety at scale.',
    color: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
  },
];

const About = () => {
  return (
    <motion.div className="max-w-7xl mx-auto px-6 py-10 w-full"
      variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-14">
        <div className="section-badge mb-4"><Shield className="w-3.5 h-3.5" /> About DeepShield</div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight max-w-xl">
          Our Mission is Your Protection
        </h1>
      </motion.div>

      {/* Main grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-14">

        {/* Left: Text + Feature cards */}
        <div>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            DeepShield Sentinel AI was built to combat the rising threat of AI-powered voice fraud.
            We combine cutting-edge AI with cybersecurity expertise to help individuals and organizations stay safe.
            Our platform analyzes voice authenticity in real time, delivering results that matter in moments of high-stakes deception.
          </p>

          {/* 4 value cards */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="p-5 rounded-2xl transition-all hover:-translate-y-0.5"
                style={{ background: v.color, border: `1px solid ${v.border}` }}
              >
                <div className="mb-3">{v.icon}</div>
                <h3 className="font-bold text-white text-sm mb-1.5">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Globe visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-80 h-80">
            {/* Outer rings */}
            {[280, 230, 180].map((size, i) => (
              <div key={i} className="absolute rounded-full"
                style={{
                  width: size, height: size,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: `1px solid rgba(59,130,246,${0.06 + i * 0.05})`,
                }} />
            ))}
            {/* Globe */}
            <div className="absolute rounded-full"
              style={{
                width: 140, height: 140,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle at 35% 35%, rgba(96,165,250,0.7), rgba(37,99,235,0.5), rgba(5,13,26,0.8))',
                boxShadow: '0 0 50px rgba(59,130,246,0.4), 0 0 100px rgba(37,99,235,0.2)',
                border: '1px solid rgba(96,165,250,0.3)',
              }}>
              {/* Grid lines on globe */}
              <svg className="w-full h-full opacity-30" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="60" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
                <ellipse cx="70" cy="70" rx="60" ry="20" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
                <ellipse cx="70" cy="70" rx="60" ry="40" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
                <line x1="10" y1="70" x2="130" y2="70" stroke="#60a5fa" strokeWidth="0.5" />
                <line x1="70" y1="10" x2="70" y2="130" stroke="#60a5fa" strokeWidth="0.5" />
              </svg>
            </div>

            {/* Orbiting dots */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 43 * Math.cos(rad);
              const y = 50 + 43 * Math.sin(rad);
              return (
                <div key={i} className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${x}%`, top: `${y}%`,
                    transform: 'translate(-50%,-50%)',
                    background: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#ef4444'][i],
                    boxShadow: `0 0 8px ${['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#ef4444'][i]}`,
                  }} />
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        {[
          { value: '98.7%', label: 'Detection Accuracy' },
          { value: '2.4M+', label: 'Voices Analyzed' },
          { value: '120+', label: 'Countries' },
          { value: '2.6s', label: 'Avg Scan Time' },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center justify-center py-7 px-4 text-center"
            style={{ background: '#050D1A' }}>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1"
              style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {s.value}
            </div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </motion.div>

    </motion.div>
  );
};

export default About;
