# Projeto: Social Login Micro-frontend SPA

Este projeto demonstra uma aplicação Single Page Application (SPA) construída com uma arquitetura de micro-frontends. O objetivo é integrar autenticação social (Google, Facebook, LinkedIn, GitHub) e apresentar diferentes abordagens de gerenciamento de estado e carregamento de recursos sob demanda (lazy loading).

## 🚀 Visão Geral do Projeto

A aplicação é dividida em três partes principais:

1.  **`container` (Shell/Host SPA):** A aplicação principal que orquestra e carrega os micro-frontends. Gerencia o roteamento global e o contexto de autenticação compartilhado.
2.  **`mf-auth` (Micro-frontend de Autenticação):** Responsável por todo o fluxo de autenticação social usando **Firebase Authentication**, gerenciamento de estado com **Context API** e busca de dados com **React Query**.
3.  **`mf-dash` (Micro-frontend de Dashboard):** Exibe dados de um dashboard, utilizando **Zustand** para estado local e **Redux Toolkit** para estado de domínio, demonstrando como diferentes abordagens podem coexistir em uma mesma arquitetura.
4.  **`api` (Fake API):** Um servidor simples de JSON (`json-server`) para simular endpoints RESTful e fornecer dados para os micro-frontends.

**Características:**

*   **Monorepo:** Organizado como um monorepo para facilitar o gerenciamento de múltiplos projetos.
*   **Lazy Loading:** Implementa carregamento sob demanda para os micro-frontends e componentes internos, otimizando a performance.
*   **Module Federation:** Utiliza Webpack Module Federation para compartilhar módulos e gerenciar as dependências entre o container e os micro-frontends.
*   **TypeScript:** Garantia de tipagem e segurança em todo o código.

## 🛠️ Tech Stack

### Geral / Monorepo
*   **Package Manager:** Yarn Workspaces (ou pnpm/npm workspaces)
*   **Build Tool:** Vite (para o `container` e `mf-auth`, `mf-dash`)
*   **Module Federation:** `@module-federation/webpack-5` (ou `vite-plugin-federation`)
*   **Linguagem:** TypeScript
*   **Roteamento:** `react-router-dom@6`

### `mf-auth` (Micro-frontend de Autenticação)
*   **Autenticação Social:** Firebase Authentication
*   **Gerenciamento de Estado:** React Context API
*   **Gerenciamento de Cache/Dados:** `@tanstack/react-query`

### `mf-dash` (Micro-frontend de Dashboard)
*   **Gerenciamento de Estado Local:** Zustand
*   **Gerenciamento de Estado de Domínio:** Redux Toolkit + React Redux

### `api` (Fake API)
*   **Servidor JSON:** `json-server`

## 📂 Estrutura de Pastas

root/
├─ package.json            ← Scripts do monorepo, workspaces
├─ apps/
│  ├─ container/           ← Aplicação host (shell)
│  │  ├─ src/
│  │  ├─ public/
│  │  ├─ vite.config.ts
│  │  ├─ webpack.config.js (para Module Federation)
│  │  └─ package.json
│  ├─ mf-auth/             ← Micro-frontend de Autenticação
│  │  ├─ src/
│  │  │  ├─ components/
│  │  │  ├─ context/
│  │  │  └─ firebase.ts
│  │  ├─ public/
│  │  ├─ vite.config.ts
│  │  ├─ webpack.config.js
│  │  └─ package.json
│  └─ mf-dash/             ← Micro-frontend de Dashboard
│     ├─ src/
│     │  ├─ components/
│     │  ├─ store/
│     │  └─ firebase.ts
│     ├─ public/
│     ├─ vite.config.ts
│     ├─ webpack.config.js
│     └─ package.json
└─ api/
└─ db.json              ← Dados para o json-server
└─ package.json

## 🗓️ Plano de Desenvolvimento (14 Dias, ~1 Hora/Dia)

### Dia 1 – Kick-off & Monorepo Setup
*   Inicializar o monorepo: `yarn init -w` (ou `pnpm init --workspace` / `npm init -y && npm pkg set workspaces='["apps/*", "api"]'`)
*   Criar diretórios `apps/container`, `apps/mf-auth`, `apps/mf-dash` e `api`.
*   Inicializar cada projeto React (CRA ou Vite) dentro de `apps/`:
    *   `cd apps/container && yarn create vite . --template react-ts`
    *   Repetir para `mf-auth` e `mf-dash`.
*   Configurar scripts `dev:all` no `package.json` raiz para iniciar todos os serviços simultaneamente (ex: `concurrently "yarn workspace api start" "yarn workspace container dev" "yarn workspace mf-auth dev" "yarn workspace mf-dash dev"`).
*   **Commit:** "Initial monorepo setup with Vite React projects"

### Dia 2 – Fake API com JSON Server
*   Instalar `json-server` no workspace `api`: `yarn workspace api add json-server`
*   Criar `api/db.json` com dados simulados (ex: `{"users": [], "posts": []}`).
*   Adicionar script `start` no `package.json` de `api`: `"json-server --watch db.json --port 4000"`.
*   Testar a API: `yarn workspace api start` e acessar `http://localhost:4000/users`.
*   **Commit:** "Fake API with json-server configured"

### Dia 3 – Container Shell & Roteamento Básico
*   No `container`: `yarn add react-router-dom@6`.
*   Configurar as rotas no `container/src/App.tsx` para `/login` e `/dashboard/*`.
*   Adicionar componentes placeholders (ex: `<h1>MF Auth Placeholder</h1>`) para os micro-frontends.
*   Implementar `React.lazy()` com `Suspense` e um `fallback` loader para os MFs.
*   **Commit:** "Container routing and MF placeholders"

### Dia 4 – Module Federation Configuration
*   No projeto raiz: `yarn add -W @module-federation/webpack-5` (ou `vite-plugin-federation` para Vite puro).
*   Configurar `webpack.config.js` (ou `vite.config.ts` com o plugin) em cada projeto:
    *   `container`: Definir como **Host**, importar `remoteEntry.js` dos MFs.
    *   `mf-auth`: Definir como **Remote**, expor `./App` (o componente principal do MF).
    *   `mf-dash`: Definir como **Remote**, expor `./App`.
*   Configurar `shared` para `react`, `react-dom`, `react-router-dom` para evitar duplicação.
*   Verificar no console do navegador se os remotos estão sendo carregados.
*   **Commit:** "Module Federation configured for all projects"

### Dia 5 – Firebase Setup (Autenticação)
*   Criar um projeto no Firebase Console.
*   Ativar provedores de autenticação (Google, Facebook, GitHub, LinkedIn) e configurar `redirect URIs` (ex: `http://localhost:3000/login`).
*   No `mf-auth` e `mf-dash`: `yarn add firebase`.
*   Criar um arquivo `src/firebase.ts` em ambos os MFs com a inicialização do Firebase e exportar `auth` instance.
*   Adicionar variáveis de ambiente (`.env`) com as credenciais do Firebase.
*   **Commit:** "Firebase integration for authentication"

### Dia 6 – MF-Auth: Context API & React Query
*   No `mf-auth`: `yarn add @tanstack/react-query`.
*   Criar um `AuthContext` (usando `createContext`) para expor `user`, `signIn` (com Firebase), `signOut`.
*   Envolver o `<App/>` do `mf-auth` com o `AuthProvider` e `QueryClientProvider`.
*   Criar a página `/login` no `mf-auth` com botões para cada provedor social (Google, FB, GitHub, LinkedIn), que chamarão `firebase.auth().signInWithPopup(provider)`.
*   **Commit:** "MF-Auth: AuthContext, React Query, and basic social login buttons"

### Dia 7 – Lazy Loading & Rotas Protegidas (Container)
*   No `container`: Implementar um `useAuthRemote()` hook que consome o contexto do `mf-auth` (usando uma "ContextBridge" ou eventos customizados para comunicar entre MFs).
*   No `container/src/App.tsx`: Proteger a rota `/dashboard` redirecionando para `/login` se o usuário não estiver autenticado.
*   Testar o fluxo: navegar para `/dashboard`, ser redirecionado para `/login`, fazer login com Google, ser redirecionado de volta para `/dashboard`.
*   **Commit:** "Container: Protected routes and cross-MF auth context"

### Dia 8 – MF-Auth: Consumindo Fake API com React Query
*   No `mf-auth`: Criar um endpoint `GET /profile?uid=xx` no `json-server` que retorne dados do usuário.
*   Desenvolver um `useProfile` query com React Query para buscar dados do perfil do usuário na fake API.
*   Implementar carregamento lazy dos dados do perfil, exibindo um `skeleton loader` enquanto os dados são buscados após o login.
*   **Commit:** "MF-Auth: React Query for user profile data with lazy fetch"

### Dia 9 – MF-Dash: Zustand + Redux Toolkit Setup
*   No `mf-dash`: `yarn add zustand @reduxjs/toolkit react-redux`.
*   Criar um `store.ts` com `zustand` para gerenciar estados locais da UI (ex: `sidebarOpen`).
*   Configurar um `store` com `Redux Toolkit` e um `slice` inicial para gerenciar dados de domínio (ex: `postsSlice`).
*   Expor o `<App/>` do `mf-dash` via Module Federation, garantindo que os Providers de Redux e Zustand envolvam os componentes internos.
*   **Commit:** "MF-Dash: Zustand and Redux Toolkit initialized"

### Dia 10 – MF-Dash: Fetch de Posts (Fake API)
*   No `mf-dash`: Criar um `thunk` no Redux Toolkit (`getPosts`) para buscar dados da `http://localhost:4000/posts` da fake API.
*   Persistir os dados buscados no `postsSlice` do Redux.
*   A UI no `mf-dash` deve ler os posts via `useSelector`.
*   Implementar `React.lazy()` para carregar um componente `PostsTable` somente quando o usuário clicar em "Ver Posts", demonstrando lazy loading intra-microfrontend.
*   **Commit:** "MF-Dash: Fetch posts with Redux Toolkit and internal lazy loading"

### Dia 11 – Integração Visual e Navbar Global
*   Opcional: Adicionar Tailwind CSS no `container` para um layout base.
*   Desenvolver uma `Navbar` no `container` que exiba o nome do usuário (obtido do `AuthContext` do `mf-auth`) e um botão de `Logout`.
*   Garantir que estilos base sejam compartilhados ou importados de forma consistente.
*   **Commit:** "Shared UI components and global Navbar integration"

### Dia 12 – Logout & Invalidação de Cache
*   No `mf-auth`: Expor uma função `signOut` que chame `firebase.auth().signOut()`.
*   No `container`: O botão de `Logout` na `Navbar` deve chamar a função `signOut` do `mf-auth`.
*   Após o logout, limpar o cache do `React Query` no `container` (`queryClient.clear()`) para garantir que dados antigos não sejam exibidos.
*   No `mf-dash`: Adicionar um listener para um evento customizado (ex: `"auth:logout"`) que limpe o estado do Redux e Zustand.
*   **Commit:** "Logout functionality and cross-MF cache invalidation"

### Dia 13 – Teste e Build de Produção
*   Rodar `yarn build` em todos os workspaces (`container`, `mf-auth`, `mf-dash`).
*   Verificar os bundles gerados e o `remoteEntry.js` dos micro-frontends.
*   Simular um ambiente de produção (ex: usando `serve-static`) para garantir que o lazy loading e a Module Federation funcionem corretamente com os builds otimizados.
*   Verificar o desempenho de carregamento usando ferramentas de desenvolvedor (ex: Lighthouse) para observar o lazy loading dos chunks.
*   **Commit:** "Production build and verification"

### Dia 14 – Refino e Documentação
*   Criar um `README.md` detalhado (este arquivo).
*   Adicionar instruções claras para configurar o Firebase e as variáveis de ambiente.
*   Revisar o código, remover `debug` ou logs desnecessários.
*   Adicionar ideias para próximos passos e melhorias futuras.
*   **Commit:** "Final refactor and documentation"

## 🧪 Como a Lazy Loading Acontece

O lazy loading é implementado em dois níveis:

1.  **Carregamento de Micro-frontends (Nível de Rota):**
    *   No `container`, os micro-frontends são carregados dinamicamente usando `React.lazy()` e o Webpack Module Federation. O código de um MF só é baixado e executado quando a rota correspondente é acessada.
    ```jsx
    const AuthApp = React.lazy(() => import('mfAuth/App'));
    const DashApp = React.lazy(() => import('mfDash/App'));

    // Dentro do Router:
    <Route path="/login" element={<Suspense fallback={<div>Loading Auth...</div>}><AuthApp /></Suspense>} />
    ```

2.  **Carregamento de Componentes Internos (Intra-Micro-frontend):**
    *   Dentro de cada micro-frontend (ex: `mf-dash`), componentes pesados ou não essenciais podem ser carregados sob demanda também com `React.lazy()`.
    ```jsx
    // No mf-dash:
    const PostsTable = React.lazy(() => import('./components/PostsTable'));

    // Renderiza PostsTable somente quando necessário (ex: um botão é clicado)
    {showPosts && (
        <Suspense fallback={<div>Loading Posts...</div>}>
            <PostsTable />
        </Suspense>
    )}
    ```

3.  **Carregamento de Dados (Fetch Sob Demanda):**
    *   **React Query (`mf-auth`):** As queries para buscar dados (ex: perfil do usuário) são configuradas para serem executadas somente quando o componente que as utiliza é montado ou quando uma condição específica é atendida (ex: após o login).
    *   **Redux Toolkit (`mf-dash`):** Os `thunks` para buscar dados (ex: posts) são despachados apenas quando a UI requer esses dados, garantindo que as requisições à API sejam feitas de forma otimizada.

## 📊 Gerenciamento de Estado por Micro-frontend

*   **`mf-auth`:**
    *   **Context API:** Para o estado global de autenticação (usuário logado, funções `signIn`/`signOut`), compartilhado através de um `AuthContext`.
    *   **React Query:** Para o gerenciamento do estado do servidor (dados do perfil do usuário), incluindo caching, invalidação e sincronização.

*   **`mf-dash`:**
    *   **Zustand:** Para o gerenciamento de estado local da UI (ex: estado de componentes, toggle de sidebar, etc.), oferecendo uma solução leve e flexível.
    *   **Redux Toolkit:** Para o gerenciamento de estado de domínio (dados complexos e persistentes como listas de posts, filtros, etc.), aproveitando as ferramentas para lógica assíncrona e imutabilidade.

## 🚀 Próximos Passos & Melhorias Futuras

*   **Firebase Emulator Suite:** Utilizar emuladores do Firebase para desenvolvimento offline e testes.
*   **SSR no Container:** Implementar Server-Side Rendering no container para melhor SEO e performance inicial.
*   **CI/CD:** Configurar pipelines de Integração Contínua e Entrega Contínua para automatizar builds e deploys.
*   **Tokens de Autenticação:** Implementar um fluxo de uso de tokens JWT da fake API para proteger recursos adicionais.
*   **MSW (Mock Service Worker):** Substituir `json-server` pelo MSW para mockar requisições de rede diretamente no navegador, melhorando a experiência de desenvolvimento e testes.
*   **Testes:** Adicionar testes unitários, de integração e end-to-end para os micro-frontends.
*   **Temas/Estilização:** Implementar um sistema de temas unificado que possa ser compartilhado entre os micro-frontends.
