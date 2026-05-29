import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Map different routes to specific local video files
// To use these, just drop these mp4 files directly into your "public" folder!
const VIDEO_MAP = {
  '/': '/home.mp4',
  '/how-it-works': '/how-it-works.mp4',
  '/detect': '/detect.mp4',
  '/results': '/results.mp4',
  '/intelligence': '/intel.mp4',
  '/intel': '/intel.mp4',
  '/technology': '/technology.mp4',
  '/dashboard': '/dashboard.mp4',
  '/report': '/report.mp4',
  '/about': '/about.mp4',
  '/contact': '/contact.mp4',
};

const OVERLAY_MAP = {
  '/': 0.85,
  '/detect': 0.85,
  '/results': 0.88,
  '/intelligence': 0.85,
  '/technology': 0.85,
  '/dashboard': 0.90,
  '/report': 0.88,
  '/about': 0.85,
  '/contact': 0.85,
};

const VideoBackground = () => {
  const location = useLocation();
  const videoRef = useRef(null);
  
  // Set the specific video for this route. If not mapped, default to null.
  const [src, setSrc] = useState(VIDEO_MAP[location.pathname] || null);
  const [videoFailed, setVideoFailed] = useState(false);
  const overlayOpacity = OVERLAY_MAP[location.pathname] ?? 0.70;

  // Whenever the route changes, update the src and reset error state
  useEffect(() => {
    setSrc(VIDEO_MAP[location.pathname] || null);
    setVideoFailed(false);
  }, [location.pathname]);

  // When the src actually updates, play the video
  useEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {}); 
    }
  }, [src]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#060E1C]" aria-hidden="true">
      {/* Video layer */}
      {src && !videoFailed && (
        <video
          ref={videoRef}
          key={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          onError={() => {
            // If the specific route video doesn't exist, remove the video 
            // completely so it becomes a static background.
            setVideoFailed(true);
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Animated dark overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: overlayOpacity - 0.1 }}
          animate={{ opacity: overlayOpacity }}
          exit={{ opacity: overlayOpacity }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
          style={{ background: `rgba(6, 14, 28, ${overlayOpacity})` }}
        />
      </AnimatePresence>
    </div>
  );
};

export default VideoBackground;
