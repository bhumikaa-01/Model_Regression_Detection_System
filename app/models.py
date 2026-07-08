from typing import Dict
from pydantic import BaseModel, Field


class PromptConfig(BaseModel):
    version: str = Field(..., description="Prompt version")
    name: str = Field(..., description="Prompt name")
    model: str = Field(..., description="Gemini model")
    temperature: float = Field(..., description="Sampling temperature")
    max_output_tokens: int = Field(..., description="Maximum output tokens")
    system_prompt: str = Field(..., description="System prompt")
    output_format: Dict[str, str] = Field(
        ..., description="Expected JSON output format"
    )


class EmailPrediction(BaseModel):
    category: str = Field(..., description="Email category")
    summary: str = Field(..., description="One sentence summary")