from openai import OpenAI

from app.core.config import settings


def generate_response(
    system_prompt: str,
    message: str,
    model: str,
) -> str:

    if not settings.openai_api_key:
        return (
            "OpenAI API key is not configured. "
            "Add OPENAI_API_KEY to backend/.env."
        )

    client = OpenAI(
        api_key=settings.openai_api_key
    )

    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": message,
            },
        ],
    )

    return response.choices[0].message.content or ""