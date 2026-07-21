from fastapi import APIRouter

router = APIRouter(
    prefix="/evaluations",
    tags=["Evaluations"],
)


@router.get("/config")
def get_evaluation_config():
    """
    Returns all available evaluation options.
    """

    return {
        "status": "success",
        "message": "Evaluation configuration retrieved successfully.",
        "data": {
            "models": [
                {
                    "id": "gemini-2.5-flash",
                    "name": "Gemini 2.5 Flash",
                },
                {
                    "id": "gemini-2.5-pro",
                    "name": "Gemini 2.5 Pro",
                },
            ],
            "prompt_versions": [
                {
                    "id": "v1",
                    "name": "Version 1",
                },
                {
                    "id": "v2",
                    "name": "Version 2",
                },
            ],
            "datasets": [
                {
                    "id": "golden_dataset_v1.json",
                    "name": "Golden Dataset v1",
                },
                {
                    "id": "golden_dataset_dev.json",
                    "name": "Golden Dataset Dev",
                },
            ],
        },
    }