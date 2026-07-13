from pydantic import BaseModel
from typing import List, Optional

class HomeResponse(BaseModel):
    """
    Response model for the home endpoint.
    """

    message: str


class HealthResponse(BaseModel):
    """
    Response model for the health endpoint.
    """

    status: str
    service: str
    version: str

class ComparisonResult(BaseModel):
    """
    Represents a single test case comparison.
    """

    id: str
    expected: str

    previous_prediction: Optional[str]
    current_prediction: Optional[str]

    previous_correct: bool
    current_correct: bool

    status: str


class ReportResponse(BaseModel):
    """
    Represents a regression report.
    """

    report_id: int

    timestamp: str

    model: str

    prompt_name: str
    prompt_version: str

    dataset_name: str
    dataset_version: str

    previous_evaluation: str
    current_evaluation: str

    execution_time_seconds: float

    total_test_cases: int

    previous_accuracy: float
    current_accuracy: float
    accuracy_delta: float

    health_status: str
    deployment_recommendation: str

    regressions: List[ComparisonResult]
    improvements: List[ComparisonResult]
    unchanged_passes: List[ComparisonResult]
    still_failing: List[ComparisonResult]