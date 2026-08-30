from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.agents import router as agents_router
from app.db.base import Base
from app.db.session import engine

# Import models so SQLAlchemy knows about them.
from app.models.agent import Agent


@asynccontextmanager
async def lifespan(app: FastAPI):

    # Create database tables automatically.
    Base.metadata.create_all(bind=engine)

    yield


app = FastAPI(
    title="FlowMind AI",
    description="Multi-agent AI automation platform",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(agents_router)


@app.get("/")
def root():
    return {
        "name": "FlowMind AI",
        "status": "online",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }
