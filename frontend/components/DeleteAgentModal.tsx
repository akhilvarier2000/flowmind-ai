"use client";

import { AlertTriangle, X } from "lucide-react";
import { Agent } from "@/types";

interface DeleteAgentModalProps {
  agent: Agent | null;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteAgentModal({
  agent,
  onCancel,
  onConfirm,
  loading = false,
}: DeleteAgentModalProps) {
  if (!agent) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal delete-modal">
        <button
          className="modal-close"
          onClick={onCancel}
        >
          <X size={20} />
        </button>

        <div className="warning-icon">
          <AlertTriangle size={28} />
        </div>

        <h2>Delete Agent?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{agent.name}</strong>?
        </p>

        <p className="warning-text">
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="danger-button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Agent"}
          </button>
        </div>
      </div>
    </div>
  );
}