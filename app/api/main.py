from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.reports import router as reports_router

app = FastAPI(
    title="LLM Regression Detection System",
    description="Production-grade LLM Evaluation and Regression Detection API",
    version="1.0.0",
)

app.include_router(health_router)
app.include_router(reports_router)