from google import genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def get_gemini_client():
    """
    Creates and returns a Gemini client.
    """
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in .env file")

    client = genai.Client(api_key=api_key)
    return client