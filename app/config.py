import yaml
from app.models import PromptConfig


def load_prompt_config(path: str = "prompts/v1.yaml") -> PromptConfig:
    """
    Load and validate the prompt configuration from a YAML file.
    """

    with open(path, "r", encoding="utf-8") as file:
        config = yaml.safe_load(file)

    return PromptConfig(**config)