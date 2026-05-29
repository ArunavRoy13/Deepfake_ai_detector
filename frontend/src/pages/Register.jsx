import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import CinematicBackground from '../components/ui/CinematicBackground';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success('Clearance Request Submitted');
    navigate('/login');
  };

  return (
    <motion.div 
      className="flex-1 w-full min-h-screen relative flex items-center justify-center bg-cyber-bg"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex w-full h-screen">
        
        {/* Left Side: Cinematic Video Background Panel */}
        <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden border-r border-cyber-border/50">
          {/* Animated Cinematic Background */}
          <CinematicBackground />
          
          <div className="relative z-10 w-full max-w-lg p-12">
            <h3 className="text-3xl font-bold text-white mb-6">Global Threat Network</h3>
            <p className="text-cyber-textSecondary leading-relaxed mb-10 text-sm">
              Establish clearance to access enterprise-grade inference models and real-time intelligence feeds designed to protect against synthetic media.
            </p>
            
            <div className="space-y-4">
              <div className="glass-panel p-6 bg-[#081226]/80 border border-cyber-border flex items-center gap-4">
                <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-xl flex items-center justify-center text-cyber-emerald shadow-glow-emerald">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-1">SOC2 Compliant Telemetry</h4>
                  <p className="text-xs text-cyber-textSecondary">Enterprise protection you can trust.</p>
                </div>
              </div>

              <div className="glass-panel p-6 bg-[#081226]/80 border border-cyber-border flex items-center gap-4">
                <div className="w-12 h-12 bg-cyber-bg border border-cyber-border rounded-xl flex items-center justify-center text-cyber-purple shadow-glow-purple">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-1">&lt;200ms Neural Latency</h4>
                  <p className="text-xs text-cyber-textSecondary">Lightning fast real-time inference.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 relative bg-cyber-bg">
          <div className="w-full max-w-md">
            
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full text-cyber-blue text-xs font-bold uppercase tracking-widest mb-6">
                <Lock className="w-3.5 h-3.5" /> Security Clearance
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Request Access</h2>
              <p className="text-cyber-textSecondary text-sm">Register your enterprise credentials to connect to the SOC.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-cyber-textSecondary uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-cyber-textSecondary uppercase tracking-widest mb-2">Operative ID / Email</label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="name@enterprise.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-cyber-textSecondary uppercase tracking-widest mb-2">Access Key</label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full shadow-glow-blue border border-cyber-blue/50">
                Submit Request
              </button>
            </form>

            <div className="mt-8 text-center border-t border-cyber-border/50 pt-8">
              <p className="text-cyber-textSecondary text-sm">
                Already hold clearance? <Link to="/login" className="text-cyber-blue hover:text-cyber-cyan font-bold transition-colors">Authenticate</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Register;
