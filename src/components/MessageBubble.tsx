import type { MessageBubbleProps } from '../types/components';

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.author === 'user';

  return (
    <li className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        aria-label={isUser ? 'Mensagem do usuário' : 'Mensagem do robô'}
        className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap shadow-sm wrap-anywhere ${
          isUser
            ? 'rounded-br-sm bg-stone-800 text-white'
            : 'rounded-bl-sm bg-white text-stone-800'
        }`}
      >
        {message.content}
      </div>
    </li>
  );
}
