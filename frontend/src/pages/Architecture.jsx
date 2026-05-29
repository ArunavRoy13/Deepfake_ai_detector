import { motion } from 'framer-motion';

const Architecture = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-tight text-slate-900">
          SYSTEM <span className="text-blue-600">ARCHITECTURE</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          DeepShield Sentinel AI is built on a robust, multi-stage pipeline designed to ingest, sanitize, and analyze audio in real-time. Our architecture leverages advanced Cross-Lingual Speech Representation (XLSR) models to identify synthetic vocal patterns.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 font-mono">1. ML Engine (XLSR)</h3>
          <p className="text-slate-600 mb-4">
            We explicitly chose a Wav2Vec2-Large-XLSR model rather than a standard language-specific model. Because XLSR was pre-trained on 53 languages, its latent space maps a massively diverse distribution of global human vocal tracts.
          </p>
          <p className="text-slate-600">
            This makes the system highly robust against out-of-distribution pitch-shifting disguises (Presentation Attacks), while remaining hypersensitive to true AI vocoder artifacts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 font-mono">2. Spectral Gating</h3>
          <p className="text-slate-600 mb-4">
            Before inference, the audio is routed through a stationary Spectral Gating noise reduction algorithm. This automatically eliminates constant background hums (like AC units or cheap microphones).
          </p>
          <p className="text-slate-600">
            By isolating the human voice from static, we ensure the XLSR model is only analyzing the actual human vocal tract frequencies without interference.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Architecture;
