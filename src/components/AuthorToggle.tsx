import type { AuthorToggleProps } from '../types/components';

export function AuthorToggle({
  selectedAuthor,
  onToggle,
}: AuthorToggleProps) {
  const isBot = selectedAuthor === 'bot';
  const authorLabel = isBot ? 'Robô' : 'Usuário';

  return (
    <button
      type="button"
      aria-label={`Autor selecionado: ${authorLabel}. Clique para alternar.`}
      aria-pressed={isBot}
      className={`flex min-h-12 shrink-0 flex-col justify-center rounded-xl px-3 text-left text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 ${
        isBot
          ? 'bg-purple-100 text-purple-900 hover:bg-purple-200'
          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
      }`}
      onClick={onToggle}
    >
      <span className="font-normal">Enviar como</span>
      <span>{authorLabel}</span>
    </button>
  );
}
