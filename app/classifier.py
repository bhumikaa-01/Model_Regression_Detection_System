import random
import time

from app.config import load_prompt_config
from app.llm_client import get_gemini_client
from app.models import EmailPrediction


class EmailClassifier:
    """
    Uses Gemini to classify customer support emails.

    Features:
    - Structured JSON output
    - Automatic retries
    - Exponential backoff
    - Random jitter
    - Intelligent retry handling
    """

    def __init__(self):
        self.client = get_gemini_client()
        self.config = load_prompt_config()

    def _calculate_wait_time(self, attempt: int, base_delay: int) -> float:
        """
        Calculates exponential backoff with ±20% random jitter.
        """

        delay = base_delay * (2 ** (attempt - 1))
        jitter = random.uniform(0.8, 1.2)

        return round(delay * jitter, 2)

    def classify(self, email: str) -> EmailPrediction | None:

        max_retries = 4
        base_delay = 5

        prompt = f"""
{self.config.system_prompt}

Customer Email:
{email}
"""

        for attempt in range(1, max_retries + 1):

            try:

                print(f"\nAttempt {attempt}/{max_retries}")

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

                if response.parsed is None:

                    if attempt < max_retries:

                        wait_time = self._calculate_wait_time(
                            attempt,
                            base_delay,
                        )

                        print("\nGemini returned invalid JSON.")
                        print(f"Retrying in {wait_time} seconds...\n")

                        time.sleep(wait_time)
                        continue

                    print("\nMaximum retry attempts reached.")
                    print("Gemini never returned valid JSON.")

                    return None

                return response.parsed

            except Exception as e:

                error_message = str(e)

                # ---------------------------------------------------
                # Daily quota exhausted -> DO NOT RETRY
                # ---------------------------------------------------

                if (
                    "RESOURCE_EXHAUSTED" in error_message
                    and "Quota exceeded" in error_message
                ):

                    print("\nDaily Gemini quota exhausted.")
                    print("Skipping retries for this request.\n")

                    return None

                # ---------------------------------------------------
                # Temporary rate limit -> Retry
                # ---------------------------------------------------

                if (
                    "429" in error_message
                    and attempt < max_retries
                ):

                    wait_time = self._calculate_wait_time(
                        attempt,
                        base_delay,
                    )

                    print("\nTemporary rate limit exceeded.")
                    print(f"Retrying in {wait_time} seconds...\n")

                    time.sleep(wait_time)
                    continue

                # ---------------------------------------------------
                # Other errors
                # ---------------------------------------------------

                print("\nRequest failed.")
                print(error_message)

                return None

        return None