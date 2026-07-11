from typing import Dict
from pydantic import BaseModel, Field


class PromptConfig(BaseModel):
    version: str
    name: str
    model: str
    temperature: float
    max_output_tokens: int
    system_prompt: str
    output_format: Dict[str, str]


class DatasetConfig(BaseModel):
    version: str
    name: str
    file: str
    description: str
    total_test_cases: int


class EmailPrediction(BaseModel):
    category: str
    summary: str