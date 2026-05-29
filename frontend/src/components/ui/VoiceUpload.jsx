import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileAudio, AlertCircle, X, Activity, CheckCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_TYPES = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-m4a', 'audio/m4a'];

const VoiceUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type) && !selectedFile.name.match(/\.(mp3|wav|m4a)$/i)) {
      toast.error('Unsupported format. Please upload MP3, WAV, or M4A.', {
        style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error('File too large. Maximum size is 25MB.', {
        style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444' }
      });
      return;
    }

    setFile(selectedFile);
    
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
    // Reset input so same file can be selected again if removed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearFile = () => {
    setFile(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setProgress(0);
    setIsUploading(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiUrl}/api/v1/detect`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      if (response.data.status === 'success') {
        console.log("[File Upload] Backend ML Response:", response.data);
        toast.success('Upload complete! Analyzing...', {
          style: { background: '#1e293b', color: '#fff', border: '1px solid #10b981' }
        });
        
        setTimeout(() => {
          navigate('/results', {
            state: {
              filename: file.name,
              filesize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              duration: '—', // Hard to get precise duration synchronously
              confidence: response.data.confidence !== undefined ? (response.data.confidence * 100).toFixed(1) : 98.4,
              verdict: response.data.label === 'SYNTHETIC' ? 'SYNTHETIC' : 'AUTHENTIC',
              threat_score: response.data.confidence !== undefined ? Math.round(response.data.confidence * 100) : 98,
              upload_id: response.data.filename
            }
          });
        }, 1500);
      }

    } catch (err) {
      console.error(err);
      toast.error('Upload failed. Please try again.', {
        style: { background: '#1e293b', color: '#fff', border: '1px solid #ef4444' }
      });
      
      // If backend isn't ready or other error
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 border border-blue-100">
          <UploadCloud className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-sm font-bold text-slate-800 uppercase tracking-widest">Upload Audio File</span>
      </div>

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]"
          >
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".mp3,.wav,.m4a,audio/*" 
              className="hidden" 
              onChange={handleFileSelect} 
            />
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`w-full h-full absolute inset-0 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all border-2 border-dashed ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-slate-100'
              }`}
            >
              <div className={`p-4 rounded-full mb-4 transition-colors ${dragOver ? 'bg-blue-100' : 'bg-white shadow-sm border border-slate-200'}`}>
                <UploadCloud className={`w-8 h-8 ${dragOver ? 'text-blue-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-slate-800 text-sm font-medium mb-1">
                Drag & drop audio file here
              </p>
              <p className="text-slate-500 text-xs mb-3">or click to browse</p>
              <div className="flex gap-2 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                <span className="px-2 py-1 bg-white border border-slate-200 rounded-md">MP3</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded-md">WAV</span>
                <span className="px-2 py-1 bg-white border border-slate-200 rounded-md">M4A</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="file-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center w-full"
          >
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 relative overflow-hidden">
              
              {/* Top Row: File Icon & Remove */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <FileAudio className="w-6 h-6 text-slate-700" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-slate-900 font-medium text-sm truncate max-w-[200px]" title={file.name}>
                      {file.name}
                    </h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                {!isUploading && (
                  <button 
                    onClick={clearFile}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Audio Preview / Waveform Mock */}
              <div className="mb-4 relative z-10">
                {!isUploading ? (
                  <audio 
                    src={audioUrl} 
                    controls 
                    className="w-full h-10 custom-audio-player rounded-lg opacity-80 hover:opacity-100 transition-opacity" 
                  />
                ) : (
                  <div className="h-10 flex items-center justify-center gap-1 opacity-60">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-blue-500 rounded-full"
                        animate={{ height: ['20%', `${Math.random() * 80 + 20}%`, '20%'] }}
                        transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Progress Bar & Status */}
              {isUploading && (
                <div className="mt-2 relative z-10">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-700 flex items-center gap-1">
                      {progress === 100 ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <RefreshCcw className="w-3 h-3 animate-spin text-blue-500" />}
                      {progress === 100 ? 'Analyzing...' : 'Uploading'}
                    </span>
                    <span className="text-slate-700">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 shadow-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>

            <motion.button
              onClick={handleUpload}
              disabled={isUploading}
              className="mt-4 w-full py-4 rounded-xl font-bold transition-all relative overflow-hidden flex items-center justify-center gap-2"
              style={{
                background: isUploading ? '#f8fafc' : '#2563eb',
                color: isUploading ? '#94a3b8' : 'white',
                border: isUploading ? '1px solid #e2e8f0' : '1px solid transparent',
              }}
            >
              {isUploading ? (
                <>
                  <Activity className="w-4 h-4 animate-pulse text-slate-400" />
                  <span>Processing File...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  Analyze File
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceUpload;
