import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Shield, Clock, TrendingUp, TrendingDown, FileAudio, History, Settings, FileText, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0 },
};

const recentScans = [
  { name: 'suspect_call.mp3', result: 'Synthetic', confidence: 98.4, threat: 'Rising', time: '3m ago', color: '#ef4444' },
  { name: 'customer_support.wav', result: 'Authentic', confidence: 12.1, threat: 'Low', time: '15m ago', color: '#10b981' },
  { name: 'family-call.m4a', result: 'Authentic', confidence: 8.7, threat: 'Low', time: '1h ago', color: '#10b981' },
  { name: 'job-offer.mp3', result: 'Synthetic', confidence: 87.8, threat: 'Medium', time: '3h ago', color: '#f59e0b' },
  { name: 'bank-call.wav', result: 'Synthetic', confidence: 95.2, threat: 'Rising', time: '3h ago', color: '#ef4444' },
];

const navItems = [
  { icon: Home, label: 'Overview', path: '/dashboard' },
  { icon: Activity, label: 'Scans', path: '/detect' },
  { icon: History, label: 'History', path: '/dashboard' },
  { icon: FileText, label: 'Reports', path: '/report' },
  { icon: Shield, label: 'AI Analysis', path: '/results' },
  { icon: Settings, label: 'Settings', path: '/dashboard' },
];

const Dashboard = () => {
  const location = useLocation();

  const metrics = [
    { label: 'Total Scans', value: '1,245', change: '+12.5%', up: true, icon: Activity },
    { label: 'Threats Blocked', value: '312', change: '+8.2%', up: true, icon: Shield },
    { label: 'Avg. Accuracy', value: '98.7%', change: '+1.1%', up: true, icon: BarChart2 },
    { label: 'Avg. Scan Time', value: '2.6s', change: '-0.8%', up: false, icon: Clock },
  ];

  // Donut chart values
  const syntheticPct = 25;
  const authenticPct = 75;
  const total = 312;
  const circumference = 2 * Math.PI * 45;
  const syntheticDash = (syntheticPct / 100) * circumference;

  return (
    <motion.div className="flex w-full min-h-full" variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-52 shrink-0 py-6 px-3 border-r border-white/5" style={{ background: '#040C1A' }}>
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path && (i === 0 || location.pathname !== '/dashboard' || i === 0);
          return (
            <Link key={item.label} to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all"
              style={{
                background: i === 0 ? 'rgba(59,130,246,0.12)' : 'transparent',
                color: i === 0 ? '#60a5fa' : 'rgba(148,163,184,0.8)',
              }}
              onMouseEnter={e => { if (i !== 0) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (i !== 0) e.currentTarget.style.background = 'transparent'; }}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-6 overflow-auto">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Analyst</h1>
          <p className="text-slate-500 text-sm">Here's what's happening with your scans today.</p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {metrics.map((m, i) => (
            <div key={i} className="card p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{m.label}</p>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
                  <m.icon className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
              <div className={`flex items-center gap-1 text-xs font-medium ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {m.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {m.change} vs last week
              </div>
            </div>
          ))}
        </div>

        {/* Table + Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Scans Table */}
          <div className="card rounded-2xl lg:col-span-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Recent Scans</h3>
              <Link to="/detect" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">+ New Scan</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['File Name', 'Result', 'Confidence', 'Threat', 'Time'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((row, i) => (
                    <tr key={i} className="table-row-dark cursor-pointer">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <FileAudio className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          <span className="text-slate-300 text-xs font-mono truncate max-w-[130px]">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${row.color}18`, color: row.color }}>
                          {row.result}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs font-mono text-slate-300">{row.confidence}%</td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-bold" style={{ color: row.color }}>{row.threat}</span>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-600">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Threat Distribution Donut */}
          <div className="card rounded-2xl p-6 flex flex-col">
            <h3 className="font-bold text-white text-sm mb-5">Threat Distribution</h3>

            <div className="flex items-center justify-center mb-5">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="10" />
                  <circle cx="50" cy="50" r="45" fill="none"
                    stroke="#ef4444"
                    strokeWidth="10"
                    strokeDasharray={`${syntheticDash} ${circumference}`}
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.6))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-white">{total}</div>
                  <div className="text-[10px] text-slate-500">Total</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Synthetic', value: `${syntheticPct}%`, count: Math.round(total * syntheticPct / 100), color: '#ef4444' },
                { label: 'Authentic', value: `${authenticPct}%`, count: Math.round(total * authenticPct / 100), color: '#10b981' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-slate-400">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">{item.count}</span>
                    <span className="text-slate-600 text-xs ml-1">({item.value})</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
              {[
                { label: '● Rising', count: 45, color: '#ef4444' },
                { label: '● Medium', count: 62, color: '#f59e0b' },
                { label: '● Low', count: 205, color: '#10b981' },
              ].map((t, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span style={{ color: t.color }}>{t.label}</span>
                  <span className="text-slate-500">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
