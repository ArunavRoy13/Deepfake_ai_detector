import { motion } from 'framer-motion';

const Security = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-tight text-slate-900">
          DEFENSE <span className="text-blue-600">IN DEPTH</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          DeepShield Sentinel AI employs a strict Zero-Trust security model. Every file uploaded is treated as potentially malicious and routed through an isolated sanitization environment.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 font-mono">Air-Gap Sanitization</h3>
          <p className="text-slate-600 text-sm">
            Files are physically re-encoded via FFmpeg to a pristine 16kHz mono WAV format. This inherently discards non-audio streams, embedded scripts, EXIF data, ID3 tags, and other potential payloads before inference.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 font-mono">Magic Numbers</h3>
          <p className="text-slate-600 text-sm">
            We manually inspect the first 12 raw hexadecimal bytes of the file in memory to securely verify the signature (e.g. RIFF...WAVE). This stops basic MIME spoofing dead in its tracks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4 font-mono">Rate Limiting</h3>
          <p className="text-slate-600 text-sm">
            The API enforces strict usage caps via slowapi, restricting IP connections to prevent Denial of Service (DoS) attacks on the computationally expensive GPU inference endpoints.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Security;
