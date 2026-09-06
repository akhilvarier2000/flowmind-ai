"use client";

import { X } from "lucide-react";
import Link from "next/link";

interface ChatHeaderProps {
  agent: {
    id: string;
    name: string;
    description: string | null;
    system_prompt: string;
    model: string;
  };
}

export default function ChatHeader({ agent }: ChatHeaderProps) {
  return (
    <div className="border-b border-base-100 pb-4 mb-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <X size={24} />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">{agent.name}</h2>
          {agent.description && (
            <p className="text-muted-foreground">{agent.description}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Model: {agent.model}</span>
          </div>
        </div>

        <div className="w-full">
          <Link href="/agents" className="w-full btn btn-sm btn-outline btn-secondary">
            ← Back to Agents
          </Link>
        </div>
      </div>
    </div>
  );
}
