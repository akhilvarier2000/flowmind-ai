from openai import OpenAI, RateLimitError, APIError, APIConnectionError

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

    try:
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
    except RateLimitError as e:
        return "OpenAI API rate limit exceeded. Please check your usage and billing at https://platform.openai.com/account/billing."
    except APIError as e:
        # Handle other API errors (invalid key, etc.)
        return f"OpenAI API error: {str(e)}. Please check your API key and network connection."
    except APIConnectionError as e:
        return "Failed to connect to OpenAI API. Please check your internet connection."
    except Exception as e:
        # Fallback response for any other error - allows app to function for testing
        return f"I'm a simulated AI agent. You said: '{message}'. In a real scenario, I would process this using the {model} model with the system prompt: '{system_prompt[:50]}...'"