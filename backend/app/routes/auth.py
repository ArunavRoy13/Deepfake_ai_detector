from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

router = APIRouter()

class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: str
    organization: str
    password: str

@router.post("/register")
async def register(user: UserRegister):
    # Dummy registration
    return {"message": "User registered successfully", "user": user.email}

@router.post("/login")
async def login(user: UserLogin):
    # Dummy login
    if user.email == "admin@deepshield.ai" and user.password == "admin":
        return {"access_token": "dummy_jwt_token_123", "token_type": "bearer"}
    return {"access_token": "dummy_jwt_token", "token_type": "bearer"}
