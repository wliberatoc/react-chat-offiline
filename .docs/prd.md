# PRD — Chat Offline

## 1. Visão geral

O Chat Offline será uma aplicação de página única para simular uma conversa local entre duas identidades: **usuário** e **robô**. A pessoa poderá alternar a identidade de envio por meio de um toggle no compositor, escrever mensagens com uma ou mais linhas e acompanhar o histórico enquanto a página permanecer aberta.

O projeto será implementado com a base já existente de **Vite, React, TypeScript e Tailwind CSS**. Não haverá backend nem persistência local nesta versão.

## 2. Objetivo

Entregar uma interface de chat simples e responsiva que permita:

- enviar mensagens como usuário ou robô;
- diferenciar visualmente o autor de cada mensagem;
- escrever mensagens multilinha sem perder o atalho de envio;
- manter o compositor sempre acessível na parte inferior da tela;
- conservar o histórico apenas durante a sessão atual da página.

## 3. Escopo funcional

### 3.1. Histórico do chat

- O histórico deve ser mantido em um state React, sem `localStorage`, banco de dados ou outra forma de persistência.
- O chat deve iniciar com uma mensagem claramente identificada como conteúdo de demonstração. Texto sugerido: **“Olá! Esta é uma mensagem de exemplo.”**
- A mensagem inicial deve usar o mesmo modelo de dados e o mesmo componente visual das mensagens enviadas durante o uso.
- Mensagens do robô devem aparecer alinhadas à esquerda.
- Mensagens do usuário devem aparecer alinhadas à direita.
- As mensagens devem preservar as quebras de linha digitadas.
- Após um novo envio, a visualização deve rolar para a mensagem mais recente.
- O histórico deve ter espaço inferior suficiente para que o compositor fixo não cubra a última mensagem.

### 3.2. Compositor de mensagem

- O compositor deve ser exibido em um card branco, centralizado e fixo na parte inferior da viewport.
- O campo de texto deve aumentar de altura de acordo com o conteúdo, até um limite que preserve a usabilidade da tela. Ao atingir esse limite, o próprio campo poderá ter rolagem vertical.
- O campo deve aceitar múltiplas linhas.
- Pressionar `Enter` deve enviar a mensagem.
- Pressionar `Shift+Enter` deve inserir uma nova linha.
- Mensagens vazias ou compostas apenas por espaços e quebras de linha não devem ser enviadas.
- Após um envio válido, o campo deve ser limpo e receber foco novamente.

### 3.3. Seleção do autor

- Um controle no lado esquerdo do compositor deve alternar entre os modos **usuário** e **robô**.
- O modo inicial deve ser **usuário**.
- O controle deve comunicar o modo atual por texto e estado visual, sem depender apenas de cor.
- Quando o modo robô estiver ativo, o card do compositor deve exibir uma borda roxa.
- Quando o modo usuário estiver ativo, o card deve usar sua borda padrão.
- Alterar o modo deve afetar apenas as próximas mensagens, sem modificar o autor das mensagens já enviadas.

### 3.4. Envio

- Um botão de envio deve ficar no lado direito do compositor.
- O botão deve permanecer desabilitado enquanto não houver texto válido.
- O clique no botão e o atalho por teclado devem executar a mesma rotina de envio.
- Cada envio deve criar uma nova mensagem com identificador único, texto e autor selecionado.
- A ordem das mensagens deve seguir a ordem dos envios.

## 4. Requisitos visuais e responsivos

- A tela inteira deve ter fundo marrom claro.
- O histórico e o compositor devem compartilhar uma largura máxima equivalente a `max-w-2xl` do Tailwind e permanecer centralizados em telas maiores.
- Em telas menores, o conteúdo deve ocupar a largura disponível com margens laterais adequadas.
- O card do compositor deve ter fundo branco, cantos arredondados e separação visual suficiente em relação ao fundo.
- A indicação roxa do modo robô deve possuir contraste perceptível.
- Os balões de usuário e robô devem ter estilos distinguíveis, além do alinhamento oposto.
- Textos longos devem quebrar dentro do balão, sem causar rolagem horizontal na página.
- A página deve respeitar a área segura inferior de dispositivos móveis quando aplicável.
- Estados de foco, hover e desabilitado devem ser perceptíveis nos controles interativos.

## 5. Acessibilidade

- O campo deve possuir nome acessível, por `label` visível ou atributo equivalente.
- O toggle deve ser implementado com um elemento interativo semântico e expor seu estado com `aria-pressed` ou semântica equivalente.
- O nome acessível do toggle deve deixar claro qual autor está selecionado.
- O botão de envio deve ser um `button` real e refletir seu estado por meio do atributo `disabled`.
- Todos os controles devem funcionar por teclado.
- O foco deve possuir indicação visual clara.
- As cores de texto e fundo devem manter contraste legível.

## 6. Modelo de dados

Todos os tipos do projeto devem ser declarados com `type`, nunca com `interface`, e armazenados em `src/types`.

Modelo mínimo sugerido:

```ts
type MessageAuthor = 'user' | 'bot';

type Message = {
  id: string;
  content: string;
  author: MessageAuthor;
};
```

Não é necessário armazenar horário nesta versão, pois ele não faz parte da interface solicitada.

## 7. Arquitetura de componentes

Todos os componentes devem ficar em `src/components`. A separação sugerida é:

- `Chat`: organiza o histórico, o compositor e o state das mensagens;
- `MessageList`: renderiza o histórico e controla a referência usada na rolagem automática;
- `MessageBubble`: apresenta uma mensagem conforme o autor;
- `MessageComposer`: controla o texto, o modo de envio e as interações de teclado;
- `AuthorToggle`: alterna e comunica o autor selecionado.

`App.tsx` deve permanecer enxuto, atuando como ponto de composição da tela. A divisão pode ser ajustada durante a implementação se algum componente não justificar uma abstração própria, desde que as responsabilidades continuem claras.

## 8. Regras de estado

- `messages`: coleção ordenada de mensagens, iniciada com a mensagem de exemplo;
- `draft`: conteúdo atual do campo de texto;
- `selectedAuthor`: autor da próxima mensagem, iniciado como `user`;
- `canSend`: valor derivado de `draft.trim().length > 0`, não sendo necessário mantê-lo em um state separado.

O state deve permanecer no ancestral comum mais próximo dos componentes que o utilizam. Não é necessário adicionar biblioteca de gerenciamento de estado.

## 9. Fora do escopo

- backend, API ou comunicação em tempo real;
- autenticação ou múltiplos usuários reais;
- integração com inteligência artificial;
- persistência após atualizar ou fechar a página;
- edição, exclusão ou reação a mensagens;
- anexos, áudio, imagens ou emojis personalizados;
- indicadores de horário, entrega, leitura ou digitação;
- temas alternativos.

## 10. Critérios de aceite

1. Ao abrir a aplicação, é exibida uma mensagem com texto que informa explicitamente ser um exemplo.
2. O modo inicial de envio é usuário.
3. Uma mensagem enviada no modo usuário aparece à direita.
4. Uma mensagem enviada no modo robô aparece à esquerda.
5. Ao ativar o modo robô, o compositor ganha borda roxa e o controle informa o modo atual.
6. Alternar o autor não modifica mensagens já existentes.
7. O botão de envio fica desabilitado para campo vazio ou somente com espaços/quebras de linha.
8. Clicar no botão envia uma mensagem válida, limpa o campo e mantém o foco disponível para nova digitação.
9. `Enter` envia uma mensagem válida e `Shift+Enter` adiciona uma nova linha.
10. As quebras de linha são preservadas no balão enviado.
11. O campo cresce com o conteúdo até seu limite visual e depois permite rolagem interna.
12. A mensagem mais recente permanece visível após o envio.
13. O compositor permanece na parte inferior da viewport sem cobrir a última mensagem.
14. O layout não apresenta rolagem horizontal em tamanhos de tela móveis ou desktop.
15. Recarregar a página restaura apenas o estado inicial com a mensagem de exemplo.
16. O projeto passa pelos comandos `npm run lint` e `npm run build`.

## 11. Plano progressivo de implementação

### Tarefa 1 — Preparar tipos e estrutura

- Criar `src/types` e declarar `MessageAuthor` e `Message` usando `type`.
- Criar os arquivos-base necessários em `src/components`.
- Definir a mensagem inicial de demonstração.

**Resultado esperado:** estrutura pronta para implementar a interface sem erros de tipagem.

### Tarefa 2 — Construir o layout principal

- Configurar a altura mínima da aplicação e o fundo marrom claro.
- Criar o contêiner central com largura máxima `2xl`.
- Reservar as áreas do histórico e do compositor.
- Garantir espaçamento inferior para o card fixo.

**Resultado esperado:** esqueleto responsivo da tela, ainda sem interações completas.

### Tarefa 3 — Implementar o histórico de mensagens

- Criar o state de mensagens com a mensagem inicial de exemplo.
- Implementar `MessageList` e `MessageBubble`.
- Aplicar alinhamento à esquerda para robô e à direita para usuário.
- Preservar quebras de linha e tratar textos longos.

**Resultado esperado:** histórico inicial renderizado e visualmente diferenciado por autor.

### Tarefa 4 — Implementar o compositor autoajustável

- Criar o campo controlado e o state do rascunho.
- Ajustar automaticamente a altura do campo até um limite definido.
- Implementar o card branco fixo e seus estados visuais básicos.
- Garantir nome acessível e foco visível.

**Resultado esperado:** texto simples e multilinha pode ser digitado sem envio.

### Tarefa 5 — Implementar a seleção do autor

- Criar o state do autor com valor inicial `user`.
- Implementar o toggle acessível no lado esquerdo do card.
- Exibir texto ou rótulo que identifique o modo atual.
- Aplicar borda roxa ao card no modo robô.

**Resultado esperado:** autor da próxima mensagem pode ser alternado com feedback claro.

### Tarefa 6 — Implementar o envio

- Criar uma única função de envio reutilizada pelo botão e pelo teclado.
- Impedir mensagens vazias ou compostas apenas por espaços.
- Gerar identificador único para cada mensagem.
- Inserir a mensagem com o autor selecionado, limpar o rascunho e restaurar o foco.
- Manter o autor selecionado após o envio para facilitar mensagens consecutivas do mesmo lado.

**Resultado esperado:** mensagens são adicionadas corretamente por clique ou `Enter`.

### Tarefa 7 — Implementar os atalhos de teclado

- Fazer `Enter` enviar quando houver conteúdo válido.
- Fazer `Shift+Enter` inserir uma quebra de linha.
- Evitar o envio acidental durante composição de texto por IME.

**Resultado esperado:** comportamento de teclado consistente com os critérios de aceite.

### Tarefa 8 — Implementar a rolagem automática

- Adicionar uma referência ao final do histórico.
- Rolar para a mensagem mais recente após cada envio.
- Validar que o compositor não encobre a última mensagem.

**Resultado esperado:** a conversa acompanha automaticamente novas mensagens.

### Tarefa 9 — Refinar responsividade e acessibilidade

- Revisar margens, alturas e larguras em telas pequenas e grandes.
- Considerar a área segura inferior em dispositivos móveis.
- Validar navegação por teclado, nomes acessíveis e estados de foco.
- Revisar contraste e estados de hover/desabilitado.

**Resultado esperado:** experiência consistente e utilizável nos principais tamanhos de tela.

### Tarefa 10 — Validar e finalizar

- Testar manualmente todos os critérios de aceite.
- Executar `npm run lint` e corrigir os problemas encontrados.
- Executar `npm run build` e corrigir erros de TypeScript ou empacotamento.
- Remover arquivos e estilos padrão do template Vite que não forem utilizados, sem remover ativos pertencentes ao projeto sem antes confirmar sua finalidade.

**Resultado esperado:** projeto compilável, sem erros de lint e pronto para entrega.

## 12. Definição de pronto

O projeto será considerado concluído quando todos os critérios de aceite forem atendidos, o comportamento for validado em viewport móvel e desktop, e os comandos de lint e build terminarem com sucesso.
