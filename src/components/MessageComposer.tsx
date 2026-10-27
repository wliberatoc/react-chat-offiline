import type { FormEvent } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import type { MessageComposerProps } from '../types/components';
import type { MessageAuthor } from '../types/message';
import { AuthorToggle } from './AuthorToggle';

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [draft, setDraft] = useState('');
  const [selectedAuthor, setSelectedAuthor] =
    useState<MessageAuthor>('user');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isBot = selectedAuthor === 'bot';
  const canSend = draft.trim().length > 0;

  useLayoutEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [draft]);

  function toggleAuthor() {
    setSelectedAuthor((currentAuthor) =>
      currentAuthor === 'user' ? 'bot' : 'user',
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = draft.trim();

    if (!content) return;

    onSend(content, selectedAuthor);
    setDraft('');
    textareaRef.current?.focus();
  }

  return (
    <form
      aria-label="Compositor de mensagem"
      className={`flex items-end gap-3 rounded-2xl border-2 bg-white p-3 shadow-lg transition-colors focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 ${
        isBot ? 'border-purple-600' : 'border-stone-200'
      }`}
      onSubmit={handleSubmit}
    >
      <AuthorToggle
        selectedAuthor={selectedAuthor}
        onToggle={toggleAuthor}
      />

      <textarea
        ref={textareaRef}
        aria-label="Mensagem"
        className="min-h-12 min-w-0 flex-1 resize-none overflow-y-auto rounded-lg bg-stone-50 px-3 py-3 text-base leading-6 text-stone-900 outline-none placeholder:text-stone-500"
        placeholder="Digite uma mensagem"
        rows={1}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />

      <button
        type="submit"
        aria-label="Enviar mensagem"
        className="min-h-12 shrink-0 rounded-xl bg-stone-800 px-4 text-sm font-semibold text-white transition-colors hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
        disabled={!canSend}
      >
        Enviar
      </button>
    </form>
  );
}
