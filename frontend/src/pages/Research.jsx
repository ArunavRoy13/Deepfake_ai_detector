import { motion } from 'framer-motion';

const Research = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono tracking-tight text-slate-900">
          DATASETS & <span className="text-blue-600">RESEARCH</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          DeepShield Sentinel AI is built upon rigorous academic research into voice cloning vectors, utilizing state-of-the-art Hugging Face models fine-tuned on the largest open-source audio datasets available.
        </p>
      </motion.div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-12">
        <h3 className="text-2xl font-bold mb-4 font-mono text-slate-900">The WaveFake Dataset</h3>
        <p className="text-slate-600 mb-6">
          The models behind DeepShield were trained to distinguish human speech from synthetic audio using the <strong>WaveFake</strong> dataset—a massive compilation of over 100,000 deepfake audio clips generated across dozens of the most common text-to-speech architectures.
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-2 font-mono text-sm">
          <li>MelGAN / Parallel WaveGAN</li>
          <li>WaveGlow / HiFi-GAN</li>
          <li>Multi-Band MelGAN</li>
          <li>Full-Band MelGAN</li>
        </ul>
      </div>
      
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
        <h3 className="text-2xl font-bold mb-4 font-mono text-white">The Threat Vector</h3>
        <p className="text-slate-300 mb-4">
          Synthetic voice cloning has evolved rapidly. Today, malicious actors require less than 3 seconds of reference audio to clone a victim's voice with 98% accuracy. This poses a massive threat to biometric authentication, phone banking, and social engineering.
        </p>
        <p className="text-slate-300">
          By utilizing Cross-Lingual Speech Representations (XLSR) to analyze fundamental vocal tract physics, DeepShield Sentinel AI stays one step ahead of synthetic impersonators.
        </p>
      </div>
    </div>
  );
};

export default Research;
