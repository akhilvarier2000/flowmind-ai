import { Agent, CreateAgentData } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getAgents(): Promise<Agent[]> {
  const response = await fetch(`${API_URL}/api/agents/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch agents");
  }

  return response.json();
}

export async function getAgent(agentId: string): Promise<Agent> {
  const response = await fetch(`${API_URL}/api/agents/${agentId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to fetch agent");
  }

  return response.json();
}

export async function createAgent(
  data: CreateAgentData
): Promise<Agent> {
  const response = await fetch(`${API_URL}/api/agents/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create agent");
  }

  return response.json();
}

export async function deleteAgent(agentId: string): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/agents/${agentId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to delete agent");
  }
}

export async function chatWithAgent(
  agentId: string,
  message: string
) {
  const response = await fetch(
    `${API_URL}/api/agents/${agentId}/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to send message");
  }

  return response.json();
}