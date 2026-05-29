import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import GradualBlur from './components/ui/GradualBlur';

// Lazy loaded pages for massive performance boost and smaller initial bundle size
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DetectionModule = lazy(() => import('./pages/DetectionModule'));
const ThreatAnalysis = lazy(() => import('./pages/ThreatAnalysis'));
const ThreatIntelligence = lazy(() => import('./pages/ThreatIntelligence'));
const Technology = lazy(() => import('./pages/Technology'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const IncidentReport = lazy(() => import('./pages/IncidentReport'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Architecture = lazy(() => import('./pages/Architecture'));
const Security = lazy(() => import('./pages/Security'));
const Research = lazy(() => import('./pages/Research'));
const Team = lazy(() => import('./pages/Team'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

        {/* Cinematic bottom blur for seamless scrolling effect across all pages */}
        <GradualBlur preset="page-footer" zIndex={40} height="8rem" strength={1} opacity={0.7} />

        <Navbar />

        <main className="flex-grow z-10 flex flex-col relative">
          <AnimatePresence mode="wait">
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/detect" element={<DetectionModule />} />
                <Route path="/results" element={<ThreatAnalysis />} />
                <Route path="/intelligence" element={<ThreatIntelligence />} />
                <Route path="/intel" element={<ThreatIntelligence />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/report" element={<IncidentReport />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/architecture" element={<Architecture />} />
                <Route path="/security" element={<Security />} />
                <Route path="/research" element={<Research />} />
                <Route path="/team" element={<Team />} />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
