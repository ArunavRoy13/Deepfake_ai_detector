import { motion } from 'framer-motion';

const Team = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-tight text-slate-900">
          PROJECT <span className="text-blue-600">TEAM</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          The brilliant minds behind the DeepShield Sentinel AI infrastructure.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6"
        >
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl font-mono">
            H
          </div>
          <div>
            <h3 className="text-2xl font-bold font-mono text-slate-900">Hiron</h3>
            <p className="text-blue-600 font-semibold mb-2">Backend & Security Lead</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Architected the FastAPI backend, designed the XLSR Machine Learning pipeline, and implemented the Zero-Trust Air-Gap sanitization defenses.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-2xl font-mono">
            A
          </div>
          <div>
            <h3 className="text-2xl font-bold font-mono text-slate-900">Academic Advisor</h3>
            <p className="text-slate-500 font-semibold mb-2">Project Mentor</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Guiding the research and evaluating the DeepShield Sentinel AI MVP for academic excellence and cybersecurity robustness.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
