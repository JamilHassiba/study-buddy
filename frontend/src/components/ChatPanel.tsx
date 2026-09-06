import { useState } from "react";
import type { ChatMessage } from "../types/chat";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { sendChatMessage } from "../api/chat";

type ChatPanelProps = {
  documentId: number | null;
};

function ChatPanel({ documentId }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function addMessage(message: ChatMessage): void {
    setMessages((currentMessages) => [...currentMessages, message]);
  }

  async function handleInputSubmit(text: string) {
    if (documentId == null) return;
    if (isLoading) return;

    addMessage({
      sender: "user",
      text: text,
    });
    setIsLoading(true);

    const chatResponse = await sendChatMessage({
      document_id: documentId,
      query: text,
    });

    setIsLoading(false);
    addMessage({
      sender: "llm",
      text: chatResponse.answer,
      sources: chatResponse.sources,
    });
  }

  return (
    <>
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSubmit={handleInputSubmit} />
    </>
  );
}

export default ChatPanel;
