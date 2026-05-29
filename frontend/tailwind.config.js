/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#020617',          // Deep Black
          panel: '#081226',       // Midnight Navy
          panelLight: '#0B132B',  // Lighter Midnight
          border: 'rgba(56, 189, 248, 0.15)', // Glass border
          blue: '#00C2FF',        // Electric Blue
          cyan: '#38BDF8',        // Subtle Cyan
          purple: '#7C3AED',      // AI Violet
          emerald: '#10B981',     // Success
          red: '#EF4444',         // Warning Red
          amber: '#F59E0B',       // Warning
          text: '#F8FAFC',        // Chrome White
          textSecondary: '#94A3B8',// Slate secondary
          textMuted: '#64748B',   // Silver Gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-glow': 'radial-gradient(circle at 50% -20%, rgba(59,130,246,0.1), rgba(250,250,250,0) 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(0, 194, 255, 0.15), inset 0 0 10px rgba(0, 194, 255, 0.05)',
        'glow-cyan': '0 0 30px rgba(56, 189, 248, 0.15)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.15)',
        'glow-red': '0 0 30px rgba(239, 68, 68, 0.2)',
        'glass': '0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
