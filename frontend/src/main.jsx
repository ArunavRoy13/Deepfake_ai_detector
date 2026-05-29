import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" toastOptions={{
      style: {
        background: '#0a0f1e',
        color: '#00d4ff',
        border: '1px solid #00d4ff',
      },
    }} />
  </React.StrictMode>,
)
