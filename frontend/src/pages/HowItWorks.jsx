import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Activity, Shield, AlertTriangle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const steps = [
  {
    num: '01',
    icon: <UploadCloud className="w-8 h-8 text-blue-400" />,
    title: 'Upload / Record',
    desc: 'Drop a voice file or record in real-time. We accept MP3, WAV, FLAC, M4A and OGG formats.',
    color: '#3b82f6',
  },
  {
    num: '02',
    icon: <Activity className="w-8 h-8 text-purple-400" />,
    title: 'Signal Processing',
    desc: 'Audio is cleaned and normalized. Background noise is stripped to isolate the vocal signal.',
    color: '#8b5cf6',
  },
  {
    num: '03',
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    title: 'Feature Extraction',
    desc: 'Extracts 100+ deep acoustic features — MFCCs, spectral patterns, pitch dynamics and more.',
    color: '#06b6d4',
  },
  {
    num: '04',
    icon: <Shield className="w-8 h-8 text-emerald-400" />,
    title: 'AI Inference',
    desc: 'Our deep learning model scores every feature against millions of synthetic voice patterns.',
    color: '#10b981',
  },
  {
    num: '05',
    icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
    title: 'Threat Assessment',
    desc: 'Renders an instant confidence verdict and detailed threat report within 2.6 seconds.',
    color: '#f59e0b',
  },
];

const HowItWorks = () => {
  return (
    <motion.div className="max-w-7xl mx-auto px-6 py-10 w-full"
      variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-14">
        <div className="section-badge mb-4 mx-auto w-fit">
          <Play className="w-3.5 h-3.5" /> How DeepShield Works
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          AI Detection in 5 Simple Steps
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Our streamlined pipeline analyzes any voice sample in real-time to deliver accurate and reliable results.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-14 relative">
        {/* Connector line desktop */}
        <div className="hidden md:block absolute top-14 left-0 right-0 h-0.5 mx-[10%]"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #f59e0b)', opacity: 0.3 }} />

        {steps.map((step, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 + 0.2 }}
            className="flex flex-col items-center text-center p-5 rounded-2xl relative"
            style={{ background: `${step.color}0d`, border: `1px solid ${step.color}25` }}
          >
            {/* Icon circle */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10"
              style={{ background: `${step.color}18`, border: `1px solid ${step.color}40`, boxShadow: `0 0 20px ${step.color}20` }}>
              {step.icon}
            </div>
            <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: `${step.color}99` }}>{step.num}</div>
            <h3 className="font-bold text-white mb-2 text-sm">{step.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Large center preview card */}
      <motion.div variants={itemVariants} className="card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mb-10">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.06), transparent 70%)' }} />

        <div className="relative z-10">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', boxShadow: '0 0 30px rgba(59,130,246,0.2)' }}>
            <Play className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">See It In Action</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Upload any audio file to watch our AI engine analyze voice authenticity in real time — results in under 3 seconds.
          </p>
          <Link to="/detect" className="btn-primary inline-flex px-8 py-3.5 text-base mx-auto">
            <Activity className="w-5 h-5" />
            Try the Live Demo
          </Link>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default HowItWorks;
