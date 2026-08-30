import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.agent import (
    AgentCreate,
    AgentResponse,
    ChatRequest,
    ChatResponse,
)
from app.services.agent_service import (
    create_agent,
    get_agent,
    get_agents,
)
from app.services.ai_service import generate_response


router = APIRouter(
    prefix="/api/agents",
    tags=["Agents"],
)


@router.get(
    "/",
    response_model=list[AgentResponse],
)
def list_agents(
    db: Session = Depends(get_db),
):
    return get_agents(db)


@router.post(
    "/",
    response_model=AgentResponse,
)
def create_new_agent(
    data: AgentCreate,
    db: Session = Depends(get_db),
):
    return create_agent(db, data)


@router.get(
    "/{agent_id}",
    response_model=AgentResponse,
)
def get_single_agent(
    agent_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    agent = get_agent(db, agent_id)

    if not agent:
        raise HTTPException(
            status_code=404,
            detail="Agent not found",
        )

    return agent


@router.post(
    "/{agent_id}/chat",
    response_model=ChatResponse,
)
def chat_with_agent(
    agent_id: uuid.UUID,
    data: ChatRequest,
    db: Session = Depends(get_db),
):
    agent = get_agent(db, agent_id)

    if not agent:
        raise HTTPException(
            status_code=404,
            detail="Agent not found",
        )

    response = generate_response(
        system_prompt=agent.system_prompt,
        message=data.message,
        model=agent.model,
    )

    return ChatResponse(
        agent_id=agent.id,
        message=data.message,
        response=response,
    )