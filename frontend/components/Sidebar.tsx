"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Settings,
  Plus,
} from "lucide-react";

interface SidebarProps {
  onCreateAgent?: () => void;
}

export default function Sidebar({
  onCreateAgent,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">F</div>

        <div>
          <div className="logo-title">FlowMind</div>
          <div className="logo-subtitle">AI AUTOMATION</div>
        </div>
      </div>

      <button
        className="new-agent-button"
        onClick={onCreateAgent}
      >
        <Plus size={18} />
        New Agent
      </button>

      <nav className="sidebar-nav">
        <Link href="/" className="nav-item active">
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link href="/agents" className="nav-item">
          <Bot size={19} />
          Agents
        </Link>

        <div className="nav-item">
          <MessageSquare size={19} />
          Chat History
        </div>

        <div className="nav-item">
          <Settings size={19} />
          Settings
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="avatar">A</div>

          <div>
            <div className="user-name">Akhil</div>
            <div className="user-plan">Personal Workspace</div>
          </div>
        </div>
      </div>
    </aside>
  );
}