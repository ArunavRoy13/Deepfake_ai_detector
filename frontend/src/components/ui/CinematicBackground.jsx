import { motion } from 'framer-motion';

const CinematicBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#020617]">
      
      {/* Immersive Deep Neural Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[140px] mix-blend-screen bg-[#00C2FF]/30"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full blur-[160px] mix-blend-screen bg-[#7C3AED]/20"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full blur-[150px] mix-blend-screen bg-[#38BDF8]/20"
      />

      {/* Cyber Grid Texture */}
      <div 
        className="absolute inset-0 z-10 opacity-30" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Spectrogram / Matrix Falling Lines Illusion */}
      <div className="absolute inset-0 z-10 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00C2FF] to-transparent"
            style={{ left: `${(i + 1) * 10}%` }}
            animate={{ y: ['-100%', '100%'], opacity: [0, 1, 0] }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Subtle Noise Texture for a premium film grain look */}
      <div 
        className="absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }}
      ></div>

      {/* Deep Vignette to focus attention on content */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_100%)] opacity-80 pointer-events-none"></div>
    </div>
  );
};

export default CinematicBackground;
