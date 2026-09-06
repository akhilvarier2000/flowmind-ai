"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useChatStore } from "@/lib/chat-store";
import { Agent } from "@/types";
import { getAgent } from "@/lib/api";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  const params = useParams<{ agentId: string }>();
  const agentId = params.agentId;
  const router = useRouter();
  
  const [agent, setAgent] = useState<Agent | null>(null);
  const { messages, addMessage, setMessages, loading } = useChatStore();
  
  useEffect(() => {
    // Load agent data
    const loadAgent = async () => {
      try {
        const agentData = await getAgent(agentId);
        setAgent(agentData);
        
        // Initialize chat with agent's system prompt
        setMessages([
          {
            role: "assistant",
            content: agentData.system_prompt,
          }
        ]);
      } catch (error) {
        console.error("Failed to load agent:", error);
        router.push("/agents");
      }
    };
    
    if (agentId) {
      loadAgent();
    }
  }, [agentId, router, setMessages]);
  
  const handleSendMessage = async (content: string) => {
    if (!agent) return;
    
    // Add user message
    addMessage({
      role: "user",
      content,
    });
    
    try {
      // Get response from agent
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agents/${agentId}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: content }),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await response.json();
      
      // Add agent response
      addMessage({
        role: "assistant",
        content: data.response,
      });
    } catch (error) {
      console.error("Failed to get agent response:", error);
      addMessage({
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      });
    }
  };
  
  if (!agent) {
    return <div className="min-h-[600px] flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-muted-foreground">Loading agent...</p>
    </div>;
  }
  
  return (
    <div className="min-h-[600px] flex flex-col">
      <ChatHeader agent={agent} />
      <main className="flex-1 overflow-hidden">
        <ChatMessages 
          messages={messages} 
          agentId={agentId} 
          loading={loading}
        />
        <ChatInput 
          onSend={handleSendMessage} 
          disabled={loading || !agent}
        />
      </main>
    </div>
  );
}
