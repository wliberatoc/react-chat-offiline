import type { Message, MessageAuthor } from './message';

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

export type MessageComposerProps = {
  onSend: (content: string, author: MessageAuthor) => void;
};
