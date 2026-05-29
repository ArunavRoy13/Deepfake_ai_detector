@echo off
echo Starting DeepShield Sentinel AI...

:: Start the Python Backend
echo Starting FastAPI Backend...
start cmd /k "cd backend\app && ..\venv\Scripts\uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

:: Start the React Frontend
echo Starting React Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting up!
echo The React frontend will be available at http://localhost:3000 (or 5173 depending on Vite config).
echo Close this window when ready.
pause
