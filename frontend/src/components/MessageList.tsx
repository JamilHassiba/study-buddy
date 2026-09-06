import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "../types/chat";
import loadingGif from "../assets/loading-spinner.gif";

type MessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
};

function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <>
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      {isLoading && <img src={loadingGif} alt="Loading..." />}
    </>
  );
}

export default MessageList;
