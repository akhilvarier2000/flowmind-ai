import uuid

from sqlalchemy.orm import Session

from app.models.agent import Agent
from app.schemas.agent import AgentCreate


def create_agent(
    db: Session,
    data: AgentCreate,
) -> Agent:

    agent = Agent(
        name=data.name,
        description=data.description,
        system_prompt=data.system_prompt,
        model=data.model,
    )

    db.add(agent)
    db.commit()
    db.refresh(agent)

    return agent


def get_agents(db: Session) -> list[Agent]:

    return (
        db.query(Agent)
        .order_by(Agent.created_at.desc())
        .all()
    )


def get_agent(
    db: Session,
    agent_id: uuid.UUID,
) -> Agent | None:

    return (
        db.query(Agent)
        .filter(Agent.id == agent_id)
        .first()
    )
