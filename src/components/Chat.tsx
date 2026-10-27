import { useState } from 'react';

import { initialMessage } from '../data/initialMessage';
import type { Message } from '../types/message';
import { MessageComposer } from './MessageComposer';
import { MessageList } from './MessageList';

export function Chat() {
  const [messages] = useState<Message[]>([initialMessage]);

  return (
    <div className="min-h-dvh bg-[#d9c2aa] text-stone-900">
      <main className="mx-auto w-full max-w-2xl px-4 pt-6 pb-36 sm:px-6 sm:pt-8">
        <MessageList messages={messages} />
      </main>

      <footer className="fixed inset-x-0 bottom-0 px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="mx-auto w-full max-w-2xl">
          <MessageComposer />
        </div>
      </footer>
    </div>
  );
}
