export interface Agent {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  model: string;
  created_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface CreateAgentData {
  name: string;
  description: string;
  system_prompt: string;
  model: string;
}