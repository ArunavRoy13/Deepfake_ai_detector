import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Lock, AlertCircle } from 'lucide-react';
import VoiceUpload from '../components/ui/VoiceUpload';
import VoiceRecorder from '../components/ui/VoiceRecorder';
import BlurText from '../components/ui/BlurText';
import { Canvas } from '@react-three/fiber';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const DetectionModule = () => {
  const [isRecordingState, setIsRecordingState] = useState('idle');

  return (
    <motion.div className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full relative"
      variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <div className="section-badge mb-4 shadow-sm mx-auto">
          <Activity className="w-3.5 h-3.5" /> Detection Engine
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
          Analyze Voice. Detect Threats.
        </h1>
        <p className="text-slate-200 text-lg max-w-xl mx-auto drop-shadow-md font-medium">
          Upload an audio file or record in real-time. Our AI engine will analyze the voice and reveal its authenticity with advanced intelligence.
        </p>
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
        {/* Upload Card */}
        <div className="card p-6 flex flex-col min-h-[350px]">
          <VoiceUpload />
        </div>
        {/* Live Recording Card */}
        <div className="card p-6 flex flex-col">
          <VoiceRecorder onStateChange={setIsRecordingState} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8 relative z-10">
        {/* Trust badges */}
        <div className="flex items-center gap-6 text-xs text-slate-300 drop-shadow-md font-medium">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-400" /> Secure</span>
          <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-blue-400" /> Private</span>
          <span className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-blue-400" /> Encrypted</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DetectionModule;
