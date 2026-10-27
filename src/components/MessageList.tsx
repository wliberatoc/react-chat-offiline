import type { MessageListProps } from '../types/components';
import { MessageBubble } from './MessageBubble';

export function MessageList({ messages }: MessageListProps) {
  return (
    <ul aria-label="Histórico de mensagens" className="flex flex-col gap-3">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </ul>
  );
}
