from pydantic import BaseModel, Field


class GoldenTestCase(BaseModel):
    id: str = Field(..., description="Unique test case ID")
    email: str = Field(..., description="Customer email")
    expected_category: str = Field(..., description="Expected category")
    expected_summary: str = Field(..., description="Expected summary")
    difficulty: str = Field(..., description="Difficulty level")
    notes: str = Field(..., description="Why this test case exists")