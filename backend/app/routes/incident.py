from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class IncidentReport(BaseModel):
    caller_id: str
    incident_time: str
    description: str
    email: str = None

@router.post("/report")
async def report_incident(report: IncidentReport):
    # Dummy save to database
    return {
        "status": "success",
        "message": "Incident logged securely in SOC database",
        "report_id": "INC-8921"
    }
