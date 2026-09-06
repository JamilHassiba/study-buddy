import { useState } from "react";

type MessageInputProps = {
  onSubmit: (text: string) => void;
};

function MessageInput({ onSubmit }: MessageInputProps) {
  const [inputText, setInputText] = useState("");

  function handleSubmit() {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText("");
    onSubmit(text);
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
