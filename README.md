# DeepShield Sentinel AI

An enterprise-grade cybersecurity platform that uses AI and Machine Learning to detect synthetic speech, deepfake voice clones, and vishing (voice phishing) attempts.

## Architecture

This project is built with a modern, decoupled architecture:

* **Frontend**: React + Vite + Tailwind CSS + Framer Motion
* **Backend**: FastAPI (Python)
* **ML Pipeline**: Scikit-Learn + Librosa
* **Security**: JWT Authentication, Rate Limiting

## Prerequisites

You need the following installed to run this project:
- Node.js (v18+)
- Python (3.9+)

## Setup Instructions

### 1. Frontend

Navigate to the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 2. Backend

Navigate to the `backend` directory:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`.
API documentation (Swagger UI) is available at `http://localhost:8000/docs`.

## Machine Learning Pipeline

The detection engine uses a Random Forest classifier trained on audio features extracted via Librosa:
* Mel-Frequency Cepstral Coefficients (MFCC)
* Spectral Centroid
* Zero Crossing Rate
* Pitch variance

The mockup inference script is located at `backend/app/ml/inference.py`. To train on real data (e.g. ASVspoof or RAVDESS), edit and run `backend/app/ml/train_model.py`.

## Cybersecurity Features

- **SOC Dashboard**: Real-time threat intelligence feeds.
- **Secure File Handling**: Validation and sanitization on all audio uploads.
- **Mock JWT Auth**: Role-based access control.

## Disclaimer

This is a proof-of-concept academic project designed to demonstrate how AI can be deployed to counter social engineering and vishing attacks. Do not use this in production without real training datasets and extensive security auditing.
