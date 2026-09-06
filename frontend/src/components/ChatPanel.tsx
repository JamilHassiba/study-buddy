import { useState } from "react";
import type { ChatMessage } from "../types/chat";
import MessageInput from "./MessageInput";

type ChatPanelProps = {
  documentId: number | null;
};

function ChatPanel({ documentId }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function addMessage(message: ChatMessage): void {
    setMessages((currentMessages) => [...currentMessages, message]);
  }

  return (
    <>
      <MessageInput documentId={documentId} addMessage={addMessage} />
    </>
  );
}

export default ChatPanel;
