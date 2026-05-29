from fastapi import APIRouter

router = APIRouter()

@router.get("/logs")
async def get_system_logs():
    return [
        {"timestamp": "2023-11-20T10:00:00Z", "event": "API Rate Limit Triggered", "source": "192.168.1.100"},
        {"timestamp": "2023-11-20T09:45:00Z", "event": "Deepfake Scan Completed - CRITICAL", "source": "User-102"}
    ]

@router.get("/reports")
async def get_all_reports():
    return [
        {"report_id": "INC-8920", "caller": "+1 555-0199", "status": "Under Investigation"},
        {"report_id": "INC-8919", "caller": "+44 7700-900077", "status": "Resolved - Confirmed Threat"}
    ]
