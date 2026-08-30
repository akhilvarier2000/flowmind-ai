"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CreateAgentData } from "@/types";

interface CreateAgentModalProps {
  onClose: () => void;
  onCreate: (data: CreateAgentData) => Promise<void>;
}

export default function CreateAgentModal({
  onClose,
  onCreate,
}: CreateAgentModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a helpful AI assistant."
  );
  const [model, setModel] = useState("gpt-4o-mini");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      setLoading(true);

      await onCreate({
        name,
        description,
        system_prompt: systemPrompt,
        model,
      });

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          className="modal-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2>Create AI Agent</h2>

        <p className="modal-description">
          Create a custom AI agent for your workflow.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Agent Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Marketing Assistant"
            required
          />

          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="What does this agent do?"
            rows={3}
          />

          <label>System Prompt</label>

          <textarea
            value={systemPrompt}
            onChange={(e) =>
              setSystemPrompt(e.target.value)
            }
            rows={4}
          />

          <label>Model</label>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="gpt-4o-mini">
              GPT-4o Mini
            </option>

            <option value="gpt-4o">
              GPT-4o
            </option>
          </select>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Agent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}