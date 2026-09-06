"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;

    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 min-h-px px-4 py-2 bg-base-200 text-base-content rounded-lg disabled:bg-base-300 disabled:text-base-content/50 disabled:cursor-not-allowed"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="btn btn-primary disabled:btn-disabled"
      >
        {disabled ? "Loading..." : <Send className="h-4 w-4" />}
      </button>
    </form>
  );
}
