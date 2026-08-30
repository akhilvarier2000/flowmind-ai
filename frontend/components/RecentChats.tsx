"use client";

import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";

interface RecentChatsProps {
  agents: {
    id: string;
    name: string;
    description: string;
  }[];
}

export default function RecentChats({
  agents,
}: RecentChatsProps) {
  return (
    <div className="recent-chats">
      <div className="section-header">
        <div>
          <h2>Recent Agents</h2>
          <p>Your AI workspace</p>
        </div>

        <Link href="/agents">
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="empty-state">
          <MessageSquare size={32} />

          <h3>No agents yet</h3>

          <p>
            Create your first AI agent to start chatting.
          </p>
        </div>
      ) : (
        <div className="recent-list">
          {agents.slice(0, 5).map((agent) => (
            <Link
              href={`/chat/${agent.id}`}
              key={agent.id}
              className="recent-item"
            >
              <div className="recent-icon">
                <MessageSquare size={18} />
              </div>

              <div className="recent-content">
                <strong>{agent.name}</strong>

                <span>
                  {agent.description ||
                    "AI Agent"}
                </span>
              </div>

              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}