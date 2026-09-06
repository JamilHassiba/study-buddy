import type { SourceOut } from "./api";

export type ChatMessage = {
  sender: "user" | "llm";
  text: string;
  sources?: SourceOut[];
};
