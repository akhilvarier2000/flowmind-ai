from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)
from app.services.agent_service import get_agent
from app.agents.engine import AgentEngine


router = APIRouter(
    prefix="/api/agents",
    tags=["Agent Chat"],
)


engine = AgentEngine()


@router.post(
    "/{agent_id}/chat",
    response_model=ChatResponse,
)
async def chat(
    agent_id: UUID,
    request: ChatRequest,
    db: Session = Depends(get_db),
):

    agent = get_agent(
        db,
        agent_id,
    )

    if not agent:

        raise HTTPException(
            status_code=404,
            detail="Agent not found",
        )

    response = await engine.run(
        system_prompt=agent.system_prompt,
        message=request.message,
        model=agent.model,
    )

    return {
        "response": response
    }
