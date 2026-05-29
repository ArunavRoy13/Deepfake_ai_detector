import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Calendar, Clock, Mail, FileText, AlertTriangle, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const incidentTypes = [
  'Vishing / Phone Phishing',
  'CEO Fraud / Impersonation',
  'Bank / Financial Scam',
  'Family Member Scam',
  'Government Impersonation',
  'Tech Support Scam',
  'Other',
];

const IncidentReport = () => {
  const [form, setForm] = useState({
    callerNumber: '',
    description: '',
    incidentType: '',
    date: '',
    time: '',
    email: '',
  });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    toast.success('Report submitted successfully!');
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}>
          <Shield className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Report Submitted</h2>
        <p className="text-slate-400 mb-6">Thank you. Your report has been received and will help protect others from voice scams.</p>
        <button onClick={() => setSubmitted(false)} className="btn-primary px-6 py-3">Submit Another Report</button>
      </div>
    );
  }

  return (
    <motion.div className="max-w-2xl mx-auto px-6 py-10 w-full"
      variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="section-badge mb-4 mx-auto w-fit"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Report Incident</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Report a Suspicious Voice Scam</h1>
        <p className="text-slate-400">Help us build a safer world. Report suspected deepfake or voice fraud attempts. Your report can protect others.</p>
      </div>

      <form onSubmit={handleSubmit} className="card rounded-2xl p-7 flex flex-col gap-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Caller Number */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Caller Number</label>
            <input
              type="tel"
              placeholder="+1 (800) 123-4567"
              className="input-field"
              value={form.callerNumber}
              onChange={e => setForm(p => ({ ...p, callerNumber: e.target.value }))}
            />
          </div>

          {/* Incident Type */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Incident Type</label>
            <div className="relative">
              <select
                className="input-field appearance-none pr-9 cursor-pointer"
                value={form.incidentType}
                onChange={e => setForm(p => ({ ...p, incidentType: e.target.value }))}
                style={{ background: 'rgba(5,13,26,0.8)' }}
              >
                <option value="" disabled>Select type…</option>
                {incidentTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Incident Description */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Incident Description</label>
          <textarea
            rows={4}
            placeholder="Describe what happened in as much detail as possible…"
            className="input-field resize-none"
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              <Calendar className="w-3.5 h-3.5 inline mr-1" /> Date & Time
            </label>
            <input
              type="datetime-local"
              className="input-field"
              value={form.date}
              onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              <Mail className="w-3.5 h-3.5 inline mr-1" /> Your Email (Optional)
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="input-field"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            />
          </div>
        </div>

        {/* File upload */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <Upload className="w-3.5 h-3.5 inline mr-1" /> Upload Audio File (Optional)
          </label>
          <label className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all"
            style={{ background: 'rgba(5,13,26,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
            <input type="file" accept="audio/*" className="hidden" onChange={e => setFile(e.target.files[0])} />
            <span className="text-sm text-slate-500">{file ? file.name : 'Browse Files…'}</span>
            <Upload className="w-4 h-4 text-slate-600" />
          </label>
          <p className="text-[11px] text-slate-700 mt-1.5">Max 50MB • MP3, WAV, M4A, OGG supported</p>
        </div>

        <button type="submit" className="btn-primary w-full py-4 text-base mt-2">
          <Shield className="w-5 h-5" />
          Submit Report
        </button>

        <p className="text-center text-xs text-slate-600">
          All reports are confidential. We will never share your personal information.
        </p>
      </form>
    </motion.div>
  );
};

export default IncidentReport;
