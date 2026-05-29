import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Send, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const subjects = ['General Inquiry', 'Technical Support', 'Enterprise Sales', 'Bug Report', 'Partnership', 'Other'];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you shortly.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <motion.div className="max-w-6xl mx-auto px-6 py-10 w-full"
      variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="section-badge mb-4 mx-auto w-fit"><Mail className="w-3.5 h-3.5" /> Contact Us</div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">We're Here to Help</h1>
        <p className="text-slate-400 text-lg">Have questions, feedback, or need support? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          <div className="card rounded-2xl p-6 flex items-start gap-4 group hover:border-blue-500/20 transition-all">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Email Support</h3>
              <p className="text-sm text-slate-400 mb-2">Fast response within 24 hours</p>
              <a href="mailto:ai@deepshield.ai" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                ai@deepshield.ai
              </a>
            </div>
          </div>

          <div className="card rounded-2xl p-6 flex items-start gap-4 group hover:border-purple-500/20 transition-all">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <MessageCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Live Chat</h3>
              <p className="text-sm text-slate-400 mb-2">Available 24/7</p>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Start Chat →
              </button>
            </div>
          </div>

          <div className="card rounded-2xl p-6 flex items-start gap-4 group hover:border-emerald-500/20 transition-all">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Headquarters</h3>
              <p className="text-sm text-slate-400 mb-2">Visit our office</p>
              <p className="text-sm text-slate-300">San Francisco, CA, USA</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="card rounded-2xl p-7 flex flex-col gap-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                <input type="text" placeholder="John Doe" className="input-field"
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Email</label>
                <input type="email" placeholder="john@example.com" className="input-field"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
              <div className="relative">
                <select className="input-field appearance-none pr-9 cursor-pointer"
                  value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                  style={{ background: 'rgba(5,13,26,0.8)' }}>
                  <option value="" disabled>Select a topic…</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
              <textarea rows={5} placeholder="How can we help you?" className="input-field resize-none"
                value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
            </div>

            <button type="submit" className="btn-primary w-full py-4 text-base">
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
