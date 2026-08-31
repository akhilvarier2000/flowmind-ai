<p align="center"> # FlowMind AI </p>


### Build, connect, and automate intelligent AI agents.

FlowMind AI is an AI automation platform designed to help you **create AI agents, connect them to tools, and build intelligent workflows** through a simple and extensible architecture.

<img width="1919" height="1047" alt="image" src="https://github.com/user-attachments/assets/476e048f-78c4-4968-b8c2-faa42bd4744c" />

> 🚀 **Turn ideas into AI-powered workflows.**

---

<p align="center">

<a href="#-features">
<img src="https://img.shields.io/badge/Features-Explore-blue?style=for-the-badge" alt="Features">
</a>

<a href="#-quick-start">
<img src="https://img.shields.io/badge/Quick_Start-Get_Started-success?style=for-the-badge" alt="Quick Start">
</a>

<a href="#-api">
<img src="https://img.shields.io/badge/API-Documentation-orange?style=for-the-badge" alt="API">
</a>

</p>

<p align="center">

<img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi&logoColor=white">
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square">
<img src="https://img.shields.io/badge/AI-Powered-purple?style=flat-square">

</p>

---

## 📑 Navigation

* [✨ Features](#-features)
* [🏗️ Architecture](#️-architecture)
* [📂 Project Structure](#-project-structure)
* [⚡ Quick Start](#-quick-start)
* [🔐 Environment Variables](#-environment-variables)
* [🚀 Running the Application](#-running-the-application)
* [🔌 API](#-api)
* [🤖 Agent System](#-agent-system)
* [🗄️ Database](#️-database)
* [🛠️ Tech Stack](#️-tech-stack)
* [🧪 Testing](#-testing)
* [🗺️ Roadmap](#️-roadmap)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

# ✨ Features

### 🤖 AI Agents

Create specialized AI agents with:

* Custom system prompts
* Configurable AI models
* Persistent agent configuration
* Individual agent conversations

### 💬 AI Chat

Interact directly with your agents through the API.

```text
User
 ↓
Agent
 ↓
System Prompt
 ↓
AI Model
 ↓
Response
```

### 🔌 Extensible Architecture

FlowMind AI is designed so additional capabilities can be added without rebuilding the core application.

Future integrations can include:

* Web search
* APIs
* Databases
* File systems
* External SaaS tools
* Webhooks
* Custom functions

### 🧠 Automation Workflows

The long-term goal is to allow users to combine:

```text
Trigger
   ↓
AI Agent
   ↓
Decision
   ↓
Tool
   ↓
Action
   ↓
Result
```

### 🗃️ Persistent Data

Agent configurations and application data are stored using PostgreSQL.

---

# 🏗️ Architecture

```mermaid
flowchart TD

    A[Frontend] --> B[FastAPI Backend]

    B --> C[API Router]

    C --> D[Agent Service]

    D --> E[(PostgreSQL)]

    C --> F[AI Service]

    F --> G[LLM Provider]

    D --> H[Agent Configuration]

    H --> F
```

### Request Flow

```mermaid
sequenceDiagram

    participant U as User
    participant API as FastAPI
    participant DB as PostgreSQL
    participant AI as AI Service

    U->>API: POST /api/agents/{id}/chat
    API->>DB: Fetch Agent
    DB-->>API: Agent Configuration
    API->>AI: Generate Response
    AI-->>API: AI Response
    API-->>U: ChatResponse
```

---

# 📂 Project Structure

```text
flowmind-ai/
│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── agents.py
│   │   │
│   │   ├── db/
│   │   │   ├── base.py
│   │   │   └── session.py
│   │   │
│   │   ├── models/
│   │   │   └── agent.py
│   │   │
│   │   ├── schemas/
│   │   │   └── agent.py
│   │   │
│   │   ├── services/
│   │   │   ├── agent_service.py
│   │   │   └── ai_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── .env
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

---

# ⚡ Quick Start

## 1️⃣ Clone the repository

```bash
git clone https://github.com/akhilvarier2000/flowmind-ai.git
```

```bash
cd flowmind-ai
```

---

## 2️⃣ Backend Setup

Move into the backend:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```powershell
.venv\Scripts\activate
```

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🔐 Environment Variables

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/flowmind
OPENAI_API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here
```

> ⚠️ **Never commit `.env` files or API keys to GitHub.**

For other developers, create:

```text
.env.example
```

Example:

```env
DATABASE_URL=
OPENAI_API_KEY=
SECRET_KEY=
```

---

# 🗄️ Database

FlowMind AI uses:

```text
PostgreSQL
     ↓
SQLAlchemy
     ↓
FastAPI
```

Make sure PostgreSQL is running before starting the backend.

Example database:

```sql
CREATE DATABASE flowmind;
```

Then configure:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/flowmind
```

---

# 🚀 Running the Application

From the `backend` directory:

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at:

```text
http://127.0.0.1:8000
```

### Interactive API Documentation

FastAPI automatically provides Swagger UI:

```text
http://127.0.0.1:8000/docs
```

and ReDoc:

```text
http://127.0.0.1:8000/redoc
```

---

# 🔌 API

## Get All Agents

```http
GET /api/agents/
```

Example:

```bash
curl http://127.0.0.1:8000/api/agents/
```

---

## Create an Agent

```http
POST /api/agents/
```

Example:

```json
{
  "name": "Research Assistant",
  "description": "An AI assistant for research",
  "system_prompt": "You are an expert research assistant.",
  "model": "gpt-4o"
}
```

---

## Get an Agent

```http
GET /api/agents/{agent_id}
```

Example:

```bash
curl http://127.0.0.1:8000/api/agents/YOUR_AGENT_ID
```

---

## Chat With an Agent

```http
POST /api/agents/{agent_id}/chat
```

Request:

```json
{
  "message": "Explain machine learning in simple terms."
}
```

Response:

```json
{
  "agent_id": "agent-id",
  "message": "Explain machine learning in simple terms.",
  "response": "Machine learning is a way for computers to learn patterns from data..."
}
```

---

# 🤖 Agent System

Each FlowMind agent contains configuration similar to:

```text
Agent
├── ID
├── Name
├── Description
├── System Prompt
├── Model
└── Metadata
```

The system prompt determines the agent's behavior.

For example:

```text
You are a senior software engineer.

Your responsibilities:
- Write clean code
- Explain technical concepts clearly
- Identify bugs
- Suggest scalable solutions
```

The AI service then combines:

```text
System Prompt
       +
User Message
       ↓
AI Model
       ↓
Generated Response
```

---

# 🛠️ Tech Stack

| Layer             | Technology        |
| ----------------- | ----------------- |
| Backend           | FastAPI           |
| Language          | Python            |
| Database          | PostgreSQL        |
| ORM               | SQLAlchemy        |
| API Documentation | Swagger / OpenAPI |
| AI                | LLM APIs          |
| Frontend          | Coming Soon       |
| Authentication    | Coming Soon       |
| Workflow Engine   | Coming Soon       |

---

# 🧪 Testing

Run tests with:

```bash
pytest
```

For a specific test:

```bash
pytest tests/test_agents.py
```

---

# 🗺️ Roadmap

## ✅ Phase 1 — Foundation

* [x] FastAPI backend
* [x] PostgreSQL integration
* [x] Agent model
* [x] Agent CRUD
* [x] AI service
* [x] Agent chat API

## 🚧 Phase 2 — Agent Platform

* [ ] Agent authentication
* [ ] Conversation history
* [ ] Streaming responses
* [ ] Agent memory
* [ ] Token usage tracking
* [ ] Model selection

## 🔜 Phase 3 — Automation

* [ ] Visual workflow builder
* [ ] Workflow triggers
* [ ] Tool integrations
* [ ] Webhooks
* [ ] Scheduled workflows
* [ ] Conditional logic

## 🔮 Phase 4 — Advanced AI

* [ ] RAG
* [ ] Vector database
* [ ] Knowledge bases
* [ ] Multi-agent workflows
* [ ] Agent-to-agent communication
* [ ] Evaluation framework

---

# 📊 Vision

FlowMind AI aims to evolve from a simple AI-agent API into a complete **AI automation platform**.

```mermaid
flowchart LR

    User --> Trigger

    Trigger --> Workflow

    Workflow --> Agent

    Agent --> Decision

    Decision --> Tool

    Tool --> Data

    Data --> Agent

    Agent --> Result

    Result --> User
```

The ultimate goal:

> **Create an AI workflow once. Let it run automatically.**

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

```bash
git clone https://github.com/akhilvarier2000/flowmind-ai.git
```

### 2. Create a branch

```bash
git checkout -b feature/my-feature
```

### 3. Make your changes

```bash
git add .
git commit -m "Add my feature"
```

### 4. Push your branch

```bash
git push origin feature/my-feature
```

### 5. Open a Pull Request

Please include:

* What you changed
* Why you changed it
* How you tested it
* Screenshots when applicable

---

# 📄 License

This project is currently under development.

License information will be added as the project matures.

---

# 👨‍💻 Author

## Akhil Varier

Building **FlowMind AI** — an AI automation platform focused on intelligent agents and workflows.

<p align="center">

⭐ If you find this project interesting, consider giving it a star!

</p>

---

<p align="center">

**Built with Python • FastAPI • PostgreSQL • AI**

</p>
