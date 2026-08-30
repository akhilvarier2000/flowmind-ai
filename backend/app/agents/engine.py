from openai import AsyncOpenAI

from app.core.config import settings


client = AsyncOpenAI(
    api_key=settings.openai_api_key
)


class AgentEngine:

    async def run(
        self,
        system_prompt: str,
        message: str,
        model: str = "gpt-4o-mini",
    ):

        response = await client.chat.completions.create(

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

        return response.choices[0].message.content