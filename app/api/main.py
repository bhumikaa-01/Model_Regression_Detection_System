from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.reports import router as reports_router
from app.api.routes.analytics import router as analytics_router

from app.api.routes.analytics import router as analytics_router


from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.api.routes.evaluation import router as evaluation_router

app = FastAPI(
    title="LLM Regression Detection API",
   description=(
    "Production-grade API for evaluating LLM outputs, "
    "comparing evaluation runs, detecting regressions, "
    "and managing versioned regression reports."
),
    version="1.0.0",
    contact={
        "name": "Bhumika Rawate",
        "url": "https://github.com/bhumikaa-01",
    },
    license_info={
        "name": "MIT",
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
def root():
    """
    Redirect users from the root URL to the Swagger documentation.
    """
    return RedirectResponse(url="/docs")

app.include_router(
    health_router,
    prefix="/api/v1"
)

app.include_router(
    reports_router,
    prefix="/api/v1"
)

app.include_router(
    analytics_router,
    prefix="/api/v1"
)

app.include_router(
    evaluation_router,
    prefix="/api/v1"
)

app.include_router(analytics_router, prefix="/api/v1")