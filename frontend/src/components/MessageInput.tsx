import { useState } from "react";
import { sendChatMessage } from "../api/chat";
import type { ChatMessage } from "../types/chat";

type ChatInputProps = {
  documentId: number | null;
  addMessage: (message: ChatMessage) => void;
};

function MessageInput({ documentId, addMessage }: ChatInputProps) {
  const [inputText, setInputText] = useState("");

  async function handleSubmit() {
    if (!inputText) return;
    if (documentId == null) return;

    const currentInput = inputText;
    setInputText("");

    addMessage({
      sender: "user",
      text: currentInput,
    });

    const chatResponse = await sendChatMessage({
      document_id: documentId,
      query: currentInput,
    });

    addMessage({
      sender: "llm",
      text: chatResponse.answer,
      sources: chatResponse.sources,
    });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          value={inputText}
          placeholder="Ask a question..."
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default MessageInput;
