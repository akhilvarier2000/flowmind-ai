"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  MessageSquare,
  Activity,
  Plus,
} from "lucide-react";

import Sidebar from "./Sidebar";
import StatCard from "./StatCard";
import AgentCard from "./AgentCard";
import CreateAgentModal from "./CreateAgentModal";
import DeleteAgentModal from "./DeleteAgentModal";
import RecentChats from "./RecentChats";

import {
  getAgents,
  createAgent,
  deleteAgent,
} from "@/lib/api";

import { Agent, CreateAgentData } from "@/types";

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [agentToDelete, setAgentToDelete] =
    useState<Agent | null>(null);

  const [deleting, setDeleting] = useState(false);

  async function loadAgents() {
    try {
      setLoading(true);

      const data = await getAgents();

      setAgents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAgents();
  }, []);

  async function handleCreate(
    data: CreateAgentData
  ) {
    await createAgent(data);

    await loadAgents();
  }

  async function handleDelete() {
    if (!agentToDelete) {
      return;
    }

    try {
      setDeleting(true);

      await deleteAgent(agentToDelete.id);

      setAgentToDelete(null);

      await loadAgents();
    } catch (error) {
      console.error(error);
      alert("Failed to delete agent.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar
        onCreateAgent={() =>
          setShowCreateModal(true)
        }
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">
              AI WORKSPACE
            </p>

            <h1>Dashboard</h1>

            <p className="header-description">
              Manage your AI agents and conversations.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              setShowCreateModal(true)
            }
          >
            <Plus size={18} />
            Create Agent
          </button>
        </header>

        <section className="stats-grid">
          <StatCard
            title="Total Agents"
            value={agents.length}
            description="AI agents created"
            icon={Bot}
          />

          <StatCard
            title="Conversations"
            value="—"
            description="Chat history"
            icon={MessageSquare}
          />

          <StatCard
            title="System Status"
            value="Online"
            description="Backend connected"
            icon={Activity}
          />
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Your Agents</h2>

              <p>
                Create, manage and chat with your AI agents.
              </p>
            </div>

            <span className="agent-count">
              {agents.length} agents
            </span>
          </div>

          {loading ? (
            <div className="loading-state">
              Loading agents...
            </div>
          ) : agents.length === 0 ? (
            <div className="empty-agents">
              <Bot size={40} />

              <h3>Create your first AI agent</h3>

              <p>
                Build an AI assistant with its own
                instructions and model.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  setShowCreateModal(true)
                }
              >
                <Plus size={18} />
                Create Agent
              </button>
            </div>
          ) : (
            <div className="agents-grid">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onDelete={setAgentToDelete}
                />
              ))}
            </div>
          )}
        </section>

        <RecentChats agents={agents} />
      </main>

      {showCreateModal && (
        <CreateAgentModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onCreate={handleCreate}
        />
      )}

      <DeleteAgentModal
        agent={agentToDelete}
        onCancel={() =>
          setAgentToDelete(null)
        }
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}