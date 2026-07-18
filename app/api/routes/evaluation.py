from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.evaluation_service import EvaluationService

router = APIRouter(
    prefix="/evaluations",
    tags=["Evaluations"],
)


class EvaluationRequest(BaseModel):
    model: str
    prompt_version: str
    dataset: str


@router.post("/run")
def run_evaluation(request: EvaluationRequest):
    """
    Trigger an LLM evaluation run.
    """

    print("\n" + "=" * 60)
    print("🚀 NEW /evaluations/run REQUEST RECEIVED")
    print(f"Model          : {request.model}")
    print(f"Prompt Version : {request.prompt_version}")
    print(f"Dataset        : {request.dataset}")
    print("=" * 60 + "\n")

    try:
        service = EvaluationService()

        return service.run(
            model=request.model,
            prompt_version=request.prompt_version,
            dataset=request.dataset,
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )