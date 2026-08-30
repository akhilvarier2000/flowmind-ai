import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AgentCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)

    description: str | None = None

    system_prompt: str = (
        "You are a helpful AI assistant. "
        "Give accurate, concise and useful answers."
    )

    model: str = "gpt-4o-mini"


class AgentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    description: str | None
    system_prompt: str
    model: str
    created_at: datetime


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)


class ChatResponse(BaseModel):
    agent_id: uuid.UUID
    message: str
    response: str
