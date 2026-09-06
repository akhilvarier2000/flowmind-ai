"use client";

import { create } from "zustand";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatStore {
  messages: Message[];
  loading: boolean;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  loading: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),
}));
