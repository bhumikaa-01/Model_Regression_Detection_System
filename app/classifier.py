from app.config import load_prompt_config
from app.llm_client import get_gemini_client
from app.models import EmailPrediction


class EmailClassifier:

    def __init__(self):
        self.client = get_gemini_client()
        self.config = load_prompt_config()

    def classify(self, email: str) -> EmailPrediction:

        prompt = f"""
{self.config.system_prompt}

Customer Email:
{email}
"""

        response = self.client.models.generate_content(
            model=self.config.model,
            contents=prompt,
            config={
                "temperature": self.config.temperature,
                "max_output_tokens": self.config.max_output_tokens,
                "response_mime_type": "application/json",
                "response_schema": EmailPrediction,
            },
        )

        return response.parsed