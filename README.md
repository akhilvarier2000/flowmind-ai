# FlowMind AI

An AI automation platform for building intelligent AI agents and workflows.

<img width="1465" height="840" alt="Screenshot 2026-09-06 at 10 45 22 AM" src="https://github.com/user-attachments/assets/c2976872-9579-497b-bdef-6cb48082922f" />


## 🚀 Overview

FlowMind AI is a powerful platform designed to help developers and businesses create, connect, and automate intelligent AI agents. Built with a modular architecture, it enables the rapid development of AI-powered applications through a simple API interface.

## ✨ Key Features

- **🤖 AI Agent Management**: Create, configure, and manage multiple AI agents with custom system prompts
- **💬 Real-time Chat Interface**: Interact with agents through RESTful API endpoints
- **🔌 Extensible Architecture**: Modular design allows easy integration of new tools and capabilities
- **🗃️ Persistent Storage**: PostgreSQL database for storing agent configurations and conversation history
- **📊 Token Usage Tracking**: Monitor and optimize AI usage costs
- **🔐 Secure Authentication**: JWT-based authentication for protecting API endpoints
- **📈 Analytics Dashboard**: Visualize agent performance and usage metrics
- **🔄 Workflow Automation**: Chain agents and tools to create complex automated workflows

## 🏗️ Architecture

FlowMind AI follows a clean, layered architecture:

```
Frontend (React/Vue) → API Gateway → Agent Service → AI Service → LLM Providers
                              ↓
                      Database (PostgreSQL) ↔ Cache (Redis)
```

The platform separates concerns into distinct services:
- **API Layer**: Handles HTTP requests and authentication
- **Agent Service**: Manages agent lifecycle and configurations
- **AI Service**: Interfaces with various LLM providers
- **Storage Layer**: Persistent data storage with PostgreSQL
- **Cache Layer**: Redis for temporary data and session storage

## 📂 Project Structure

```
flowmind-ai/
├── backend/
│   ├── app/
│   │   ├── api/           # API route definitions
│   │   ├── core/          # Core configurations and utilities
│   │   ├── db/            # Database models and connections
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas for validation
│   │   ├── services/      # Business logic implementations
│   │   └── main.py        # Application entry point
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── src/               # Frontend source code
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── docker-compose.yml     # Container orchestration
├── Dockerfile             # Backend container definition
├── README.md              # This file
└── .gitignore             # Git ignore patterns
```

## ⚡ Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+ (for frontend development)
- PostgreSQL 14+
- Redis (optional, for caching)
- Docker and Docker Compose (for containerized deployment)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/akhilvarier2000/flowmind-ai.git
   cd flowmind-ai
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python3 -m venv .venv
   
   # On macOS/Linux
   source .venv/bin/activate
   
   # On Windows
   .venv\Scripts\activate
   
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize the database**
   ```bash
   # Assuming PostgreSQL is running
   createdb flowmind
   alembic upgrade head  # If using migrations
   ```

5. **Run the application**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup (Optional)

```bash
cd ../frontend
npm install
npm run dev  # For development
# or
npm run build  # For production
```

## 🔐 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Settings
HOST=0.0.0.0
PORT=8000
DEBUG=True

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/flowmind

# Redis (optional)
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Providers (add as needed)
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
GOOGLE_API_KEY=your-google-api-key

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:8080"]
```

## 🚀 Running the Application

### Development Mode
```bash
# Backend
cd backend
uvicorn app.main:app --reload

# Frontend (in another terminal)
cd frontend
npm run dev
```

### Production Mode (Using Docker)
```bash
docker-compose up --build
```

The API will be available at:
- **Local Development**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc (ReDoc)

## 🔌 API Endpoints

### Agent Management
- `GET /api/agents/` - List all agents
- `POST /api/agents/` - Create a new agent
- `GET /api/agents/{agent_id}` - Get agent details
- `PUT /api/agents/{agent_id}` - Update an agent
- `DELETE /api/agents/{agent_id}` - Delete an agent

### Agent Interaction
- `POST /api/agents/{agent_id}/chat` - Send a message to an agent
- `GET /api/agents/{agent_id}/history` - Get conversation history
- `DELETE /api/agents/{agent_id}/history` - Clear conversation history

### System
- `GET /health` - Health check endpoint
- `GET /metrics` - Prometheus metrics (if enabled)
- `GET /docs` - Interactive API documentation

## 🤖 Creating Your First Agent

Here's how to create and interact with an agent using curl:

```bash
# Create a new research assistant agent
curl -X POST "http://localhost:8000/api/agents/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Research Assistant",
    "description": "An AI agent specialized in research tasks",
    "system_prompt": "You are an expert research assistant. Provide detailed, well-sourced information on any topic.",
    "model": "gpt-4o-mini",
    "temperature": 0.7
  }'

# Chat with your agent
AGENT_ID=$(curl -s "http://localhost:8000/api/agents/" | jq -r '.[0].id')
curl -X POST "http://localhost:8000/api/agents/$AGENT_ID/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain the concept of machine learning in simple terms."
  }'
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | FastAPI (Python) |
| **Frontend** | React/Vue.js (Coming Soon) |
| **Database** | PostgreSQL |
| **ORM** | SQLAlchemy |
| **Cache** | Redis (Optional) |
| **AI Providers** | OpenAI, Anthropic, Google, Hugging Face |
| **Authentication** | JWT, OAuth2 |
| **API Docs** | Swagger/OpenAPI |
| **Testing** | Pytest, Jest |
| **Deployment** | Docker, Docker Compose, Kubernetes |
| **Monitoring** | Prometheus, Grafana |

## 🧪 Testing

Run the test suite to ensure everything is working correctly:

```bash
# Backend tests
cd backend
pytest

# Frontend tests (when implemented)
cd ../frontend
npm test
```

To run tests with coverage:
```bash
pytest --cov=app tests/
```

## 📚 Documentation

- [API Reference](http://localhost:8000/docs) - Interactive Swagger UI
- [Architecture Guide](docs/architecture.md) - Deep dive into system design
- [Deployment Guide](docs/deployment.md) - Instructions for various environments
- [Integration Examples](docs/integrations/) - Sample integrations with popular services

## 🗺️ Roadmap

### Phase 1: Foundation (Complete)
- ✅ Core agent management system
- ✅ RESTful API with full CRUD operations
- ✅ Multiple LLM provider support
- ✅ PostgreSQL integration
- ✅ Basic authentication system

### Phase 2: Enhancement (In Progress)
- 🚧 Real-time chat with WebSocket support
- 🚧 Agent memory and context persistence
- 🚧 Workflow builder and automation engine
- 🚧 Advanced analytics and monitoring
- 🚧 Comprehensive testing suite

### Phase 3: Expansion (Planned)
- 🔜 Frontend dashboard application
- 🔜 Marketplace for community-built agents
- 🔜 Team collaboration features
- 🔜 Advanced security and compliance tools
- 🔜 Mobile applications (iOS/Android)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository** on GitHub
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed instructions.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Thanks to all contributors who have helped shape FlowMind AI
- Inspired by the growing need for accessible AI agent platforms
- Built with ❤️ using open-source technologies

## 📧 Contact

Have questions or feedback? Reach out to us:
- **Issues**: [GitHub Issues](https://github.com/akhilvarier2000/flowmind-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/akhilvarier2000/flowmind-ai/discussions)
- **Email**: akhil.varier@example.com

---

<p align="center">
  Built with ❤️ by <strong>Akhil Varier</strong> and the FlowMind AI Community
</p>

<p align="center">
  <a href="https://github.com/akhilvarier2000/flowmind-ai/stargazers"><img src="https://img.shields.io/github/stars/akhilvarier2000/flowmind-ai?style=social" alt="GitHub Stars"></a>
  <a href="https://github.com/akhilvarier2000/flowmind-ai/network/members"><img src="https://img.shields.io/github/forks/akhilvarier2000/flowmind-ai?style=social" alt="GitHub Forks"></a>
</p>
