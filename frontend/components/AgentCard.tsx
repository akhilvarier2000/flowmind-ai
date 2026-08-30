"use client";

import Link from "next/link";
import { Bot, MessageSquare, Trash2 } from "lucide-react";
import { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  onDelete: (agent: Agent) => void;
}

export default function AgentCard({
  agent,
  onDelete,
}: AgentCardProps) {
  return (
    <div className="agent-card">
      <div className="agent-card-header">
        <div className="agent-icon">
          <Bot size={24} />
        </div>

        <button
          className="delete-button"
          onClick={() => onDelete(agent)}
          title="Delete agent"
        >
          <Trash2 size={17} />
        </button>
      </div>

      <h3>{agent.name}</h3>

      <p>
        {agent.description || "No description provided."}
      </p>

      <div className="agent-model">
        {agent.model}
      </div>

      <div className="agent-card-footer">
        <Link
          href={`/chat/${agent.id}`}
          className="chat-button"
        >
          <MessageSquare size={17} />
          Open Chat
        </Link>
      </div>
    </div>
  );
}