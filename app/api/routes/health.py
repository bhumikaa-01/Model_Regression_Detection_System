from fastapi import APIRouter
from app.api.schemas import HomeResponse, HealthResponse

router = APIRouter()


@router.get("/", response_model=HomeResponse)
def home():
    return {
        "message": "Welcome to the LLM Regression Detection API"
    }


@router.get("/health", response_model=HealthResponse)
def health():
    return {
        "status": "healthy",
        "service": "LLM Regression Detection System",
        "version": "1.0.0"
    }