from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
async def get_threat_stats():
    return {
        "total_scans_24h": 1248,
        "deepfakes_blocked": 86,
        "active_incidents": 14,
        "model_accuracy": 99.2
    }

@router.get("/recent")
async def get_recent_threats():
    return [
        {"time": "Just now", "target": "CEO Fraud Attempt", "score": 98, "type": "ElevenLabs Model"},
        {"time": "2 min ago", "target": "Vishing: Helpdesk", "score": 85, "type": "Unknown VC Model"},
        {"time": "15 min ago", "target": "Grandparent Scam", "score": 92, "type": "Coqui TTS"},
        {"time": "1 hr ago", "target": "Wire Transfer Auth", "score": 96, "type": "VITS Model"}
    ]
