"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/lib/chat-store";

interface ChatMessagesProps {
  messages: Message[];
  agentId: string;
  loading: boolean;
}

export default function ChatMessages({ messages, agentId, loading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} max-w-[80%]`}>
          <div className={`${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-base-200 text-base-content"} rounded-lg p-4 max-w-[80%] `}>
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.role === "assistant" && (
              <div className="text-xs text-muted-foreground mt-2">
                <span>Agent {agentId.slice(0, 8)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="loading loading-spinner loading-sm"></div>
          <p className="ml-2">Thinking...</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
