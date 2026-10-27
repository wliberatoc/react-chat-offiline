export type MessageAuthor = 'user' | 'bot';

export type Message = {
  id: string;
  content: string;
  author: MessageAuthor;
};
