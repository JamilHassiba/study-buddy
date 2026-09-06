import type { ChatMessage } from "../types/chat";

type MessageBubbleProps = {
  message: ChatMessage;
};

function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <>
      <div>{message.text}</div>
      {message.sources && (
        <details>
          <summary>Sources ({message.sources.length})</summary>
          {message.sources.map((source) => (
            <div key={source.index}>{source.content}</div>
          ))}
        </details>
      )}
    </>
  );
}

export default MessageBubble;
