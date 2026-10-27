import type { Message } from './message';
import type { MessageAuthor } from './message';

export type AuthorToggleProps = {
  selectedAuthor: MessageAuthor;
  onToggle: () => void;
};

export type MessageListProps = {
  messages: Message[];
};

export type MessageBubbleProps = {
  message: Message;
};
