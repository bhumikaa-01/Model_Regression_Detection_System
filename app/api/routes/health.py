from fastapi import APIRouter

from app.api.schemas import HomeResponse, HealthResponse

router = APIRouter(tags=["System"])


@router.get(
    "/",
    response_model=HomeResponse,
    summary="API Home",
    description="Returns a welcome message for the LLM Regression Detection API.",
)
def home():
    return {
        "message": "Welcome to the LLM Regression Detection API"
    }


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check",
    description="Returns the operational status and version of the API.",
)
def health():
    return {
        "status": "healthy",
        "service": "LLM Regression Detection System",
        "version": "1.0.0",
    }