import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, Activity, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VoiceRecorder = ({ onStateChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordTime, setRecordTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [audioData, setAudioData] = useState(new Array(30).fill(10));

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const rafIdRef = useRef(null);
  const timerRef = useRef(null);
  const streamRef = useRef(null);
  const audioElemRef = useRef(null);

  const navigate = useNavigate();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMediaTracks();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const updateWaveform = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Sample the frequency data down to 30 bars
    const bars = 30;
    const step = Math.floor(dataArrayRef.current.length / bars);
    const newData = [];
    
    for (let i = 0; i < bars; i++) {
      let sum = 0;
      for (let j = 0; j < step; j++) {
        sum += dataArrayRef.current[i * step + j];
      }
      const avg = sum / step;
      // Normalize between 10% and 100% height
      const height = Math.max(10, (avg / 255) * 100);
      newData.push(height);
    }
    
    setAudioData(newData);
    rafIdRef.current = requestAnimationFrame(updateWaveform);
  };

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setAudioUrl(null);
      setAudioBlob(null);
      setRecordTime(0);
      
      if (onStateChange) onStateChange('recording');

      timerRef.current = setInterval(() => {
        setRecordTime(prev => prev + 1);
      }, 1000);
      
      updateWaveform();
      
    } catch (err) {
      console.error("Microphone error:", err);
      setError("Microphone access denied or unavailable.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      setAudioData(new Array(30).fill(10)); // Flatten waveform
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordTime(prev => prev + 1);
      }, 1000);
      updateWaveform();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      stopMediaTracks();
      setAudioData(new Array(30).fill(10));
      if (onStateChange) onStateChange('stopped');
    }
  };

  const clearRecording = () => {
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordTime(0);
    setError(null);
    if (onStateChange) onStateChange('idle');
  };

  const handleAnalyze = async () => {
    if (!audioBlob) return;
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'live_recording.webm');
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/v1/detect`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Analysis request failed');
      }
      
      const data = await response.json();
      console.log("[Live Recording] Backend ML Response:", data);
      
      if (data.status !== 'success') {
          throw new Error('Analysis failed or returned invalid status');
      }
      
      navigate('/results', {
        state: {
          filename: 'live-recording.webm',
          filesize: `${(audioBlob.size / 1024).toFixed(1)} KB`,
          duration: formatTime(recordTime),
          confidence: data.confidence !== undefined ? (data.confidence * 100).toFixed(1) : 98.4,
          verdict: data.label === 'SYNTHETIC' ? 'SYNTHETIC' : 'AUTHENTIC',
          threat_score: data.confidence !== undefined ? Math.round(data.confidence * 100) : 98,
          upload_id: data.filename || 'live-recording'
        }
      });
      
    } catch (err) {
      console.error(err);
      setError("Analysis failed: Backend API is offline or returning an error. Please check your FastAPI server.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 border border-blue-100">
          <Mic className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">Live Recording</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
        {error && (
          <div className="absolute top-0 left-0 right-0 bg-red-500/20 border border-red-500/40 text-red-200 text-xs p-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Center Mic Button */}
        <AnimatePresence mode="wait">
          {!audioUrl ? (
            <motion.button
              key="mic-btn"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={!isRecording ? startRecording : isPaused ? resumeRecording : pauseRecording}
              className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all group focus:outline-none"
              style={{
                background: isRecording ? '#eff6ff' : '#f8fafc',
                border: `2px solid ${isRecording && !isPaused ? '#3b82f6' : isPaused ? '#93c5fd' : '#e2e8f0'}`,
                boxShadow: isRecording && !isPaused ? '0 0 40px rgba(59,130,246,0.2)' : 'none',
              }}
            >
              {isRecording && !isPaused && (
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-500" />
              )}
              {isRecording ? (
                isPaused ? <Play className="w-8 h-8 text-blue-600" /> : <Pause className="w-8 h-8 text-blue-600" />
              ) : (
                <Mic className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
              )}
            </motion.button>
          ) : (
            <motion.div
              key="audio-player"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm"
            >
              <audio 
                ref={audioElemRef}
                src={audioUrl} 
                controls 
                className="w-full custom-audio-player h-12 rounded-lg" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Text & Timer */}
        <div className="text-center h-16">
          <div className="text-3xl font-mono font-bold text-slate-800 tracking-widest drop-shadow-sm">
            {formatTime(recordTime)}
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide uppercase">
            {audioUrl ? 'Recording Complete' : isPaused ? 'Paused' : isRecording ? '● Recording in progress' : 'Tap mic to start'}
          </p>
        </div>

        {/* Live Waveform */}
        {!audioUrl && (
          <div className="flex items-end justify-center gap-1 h-16 w-full px-4 mb-2">
            {audioData.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-full transition-all duration-75"
                  style={{
                    height: `${height}%`,
                    background: isRecording && !isPaused 
                      ? '#3b82f6' 
                      : '#cbd5e1',
                    opacity: isRecording && !isPaused ? 1 : 0.5
                  }}
                />
            ))}
          </div>
        )}

        {/* Controls */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-4 mt-2"
            >
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all font-medium text-sm"
              >
                <Square className="w-4 h-4" /> Stop
              </button>
            </motion.div>
          )}

          {audioUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mt-2 w-full"
            >
              <button
                onClick={clearRecording}
                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all"
                title="Discard Recording"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 py-4 rounded-xl font-bold transition-all relative overflow-hidden flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Analyze Recording
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoiceRecorder;
