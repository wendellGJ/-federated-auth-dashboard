# 🚀 Micro-frontend Social Auth SPA

Uma aplicação Single Page Application (SPA) construída com arquitetura de micro-frontends que integra autenticação social (Google, Facebook, LinkedIn, GitHub) com diferentes abordagens de gerenciamento de estado e lazy loading otimizado.

**Stack Principal:**
- React 18 + TypeScript
- Vite + Module Federation
- Firebase Authentication
- Context API + React Query (MF-Auth)
- Zustand + Redux Toolkit (MF-Dashboard)
- Material-UI (MUI)
- json-server (Fake API)
- Yarn Workspaces

---

## 📋 Índice

1. [Como Rodar o Projeto](#-como-rodar-o-projeto)
2. [Como Rodar os Testes](#-como-rodar-os-testes)
3. [Visão Geral](#-visão-geral)
4. [Tech Stack](#-tech-stack)
5. [Estrutura de Pastas](#-estrutura-de-pastas)
6. [Plano de Desenvolvimento](#-plano-de-desenvolvimento)
7. [Gerenciamento de Estado](#-gerenciamento-de-estado)
8. [Lazy Loading](#-lazy-loading)
9. [Setup Inicial](#-setup-inicial)
10. [Endpoints da API](#-endpoints-da-api)
11. [Deploy](#-deploy)
12. [Troubleshooting](#-troubleshooting)
13. [Próximos Passos](#-próximos-passos)

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **Yarn** v1.22+ ([Instalar globalmente](https://yarnpkg.com/en/docs/install))
- **Git** ([Download](https://git-scm.com/))
- **Conta Firebase** ([Criar aqui](https://firebase.google.com/))

### Instalação Rápida

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/microfrontend-social-auth-spa.git
cd microfrontend-social-auth-spa

# 2. Instalar dependências de todos os workspaces
yarn install

# 3. Instalar Material-UI em todos os workspaces
yarn workspace container add @mui/material @emotion/react @emotion/styled
yarn workspace mf-auth add @mui/material @emotion/react @emotion/styled
yarn workspace mf-dash add @mui/material @emotion/react @emotion/styled

# 4. Configurar variáveis de ambiente
cp apps/container/.env.example apps/container/.env.local
cp apps/mf-auth/.env.example apps/mf-auth/.env.local
cp apps/mf-dash/.env.example apps/mf-dash/.env.local

# 5. Preencher as credenciais Firebase em apps/mf-auth/.env.local
```

### Rodar Todos os Serviços em Paralelo

```bash
# Inicia: json-server (porta 3000), container (5173), mf-auth (5174), mf-dash (5175)
yarn dev:all
```

**Acesse:** http://localhost:5173

### Rodar Serviços Individuais

```bash
# Terminal 1: Fake API (json-server)
yarn dev:api
# Acesse: http://localhost:3000

# Terminal 2: Container (Shell/Host)
yarn dev:container
# Acesse: http://localhost:5173

# Terminal 3: MF-Auth (Autenticação)
yarn dev:mf-auth
# Acesse: http://localhost:5174

# Terminal 4: MF-Dashboard
yarn dev:mf-dash
# Acesse: http://localhost:5175
```

### Variáveis de Ambiente

#### `apps/container/.env.local`
```env
VITE_API_URL=http://localhost:3000
```

#### `apps/mf-auth/.env.local` (Firebase)
```env
VITE_FIREBASE_API_KEY=seu_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

#### `apps/mf-dash/.env.local`
```env
VITE_API_URL=http://localhost:3000
```

---

## 🧪 Como Rodar os Testes

### Instalação de Dependências de Teste

```bash
# Instalar Vitest e Testing Library globalmente
yarn add -W -D vitest @testing-library/react @testing-library/jest-dom @vitest/ui

# Instalar em cada workspace
yarn workspace container add -D vitest @testing-library/react @testing-library/jest-dom
yarn workspace mf-auth add -D vitest @testing-library/react @testing-library/jest-dom
yarn workspace mf-dash add -D vitest @testing-library/react @testing-library/jest-dom
```

### Configurar Vitest em cada workspace

No `vite.config.ts` de cada projeto, adicione:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

### Rodar Todos os Testes

```bash
# Executar testes de todos os workspaces
yarn workspaces foreach run test

# Ou individualmente:
yarn workspace container run test
yarn workspace mf-auth run test
yarn workspace mf-dash run test
```

### Testes com Watch Mode

```bash
yarn workspaces foreach run test:watch
```

### Cobertura de Testes

```bash
yarn workspaces foreach run test:coverage
```

### Testes de Integração (Playwright)

```bash
# Instalar Playwright
yarn add -W -D @playwright/test

# Rodar testes E2E
yarn test:e2e
```

---

## 🎯 Visão Geral

A aplicação é dividida em **3 micro-frontends** orquestrados por um **container shell**:

### 1. **Container (Shell/Host)** 🏠
Aplicação principal que orquestra e carrega os micro-frontends dinamicamente.

**Responsabilidades:**
- Gerencia o roteamento global
- Orquestra autenticação compartilhada
- Exibe Navbar global com dados do usuário
- Carrega MF-Auth e MF-Dashboard sob demanda (lazy loading)

### 2. **MF-Auth** 🔐
Micro-frontend responsável por todo o fluxo de autenticação social.

**Características:**
- Autenticação com Google, Facebook, LinkedIn, GitHub via Firebase
- Estado gerenciado com **Context API**
- Busca de dados (perfil) com **React Query**
- Lazy loading de dados do perfil
- UI com **Material-UI**

### 3. **MF-Dashboard** 📊
Micro-frontend que exibe dados de posts e usuários.

**Características:**
- Estado local com **Zustand** (sidebar, UI state)
- Estado de domínio com **Redux Toolkit** (posts, dados)
- Fetch de posts com thunks do Redux
- Lazy loading de componentes internos (PostsTable)
- UI com **Material-UI** (DataGrid, Cards)

### 4. **API (json-server)** 🗄️
Servidor simulado de JSON que fornece dados fake para desenvolvimento.

**Endpoints:**
- `/users` - Lista de usuários
- `/posts` - Lista de posts
- `/profile` - Perfil do usuário logado

---

## 🛠️ Tech Stack

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Runtime** | Node.js | 16+ |
| **Frontend** | React | 18+ |
| **Linguagem** | TypeScript | 5+ |
| **Build** | Vite | 5+ |
| **Module Federation** | Webpack 5 / Vite Plugin | - |
| **Estado Local** | Zustand | 4+ |
| **Estado Global** | Redux Toolkit | 1.9+ |
| **Context** | React Context API | - |
| **Dados/Cache** | React Query (TanStack) | 5+ |
| **Autenticação** | Firebase | 10+ |
| **UI Components** | Material-UI | 5+ |
| **Styling** | Emotion | 11+ |
| **Roteamento** | React Router | 6+ |
| **HTTP Client** | Fetch API | - |
| **Monorepo** | Yarn Workspaces | 1.22+ |
| **API Fake** | json-server | 0.17+ |
| **Testes** | Vitest | 1+ |
| **Testing** | React Testing Library | 14+ |
| **E2E Tests** | Playwright | 1.40+ |

---

## 📂 Estrutura de Pastas

```
root/
├─ package.json
├─ README.md
├─ .gitignore
├─ yarn.lock
├─ apps/
│  ├─ container/
│  │  ├─ src/
│  │  │  ├─ App.tsx
│  │  │  ├─ main.tsx
│  │  │  ├─ vite-env.d.ts
│  │  │  ├─ components/
│  │  │  │  ├─ Navbar.tsx
│  │  │  │  └─ Layout.tsx
│  │  │  ├─ pages/
│  │  │  │  ├─ Login.tsx
│  │  │  │  └─ Dashboard.tsx
│  │  │  └─ styles/
│  │  ├─ public/
│  │  ├─ vite.config.ts
│  │  ├─ webpack.config.js
│  │  ├─ tsconfig.json
│  │  ├─ .env.example
│  │  └─ package.json
│  ├─ mf-auth/
│  │  ├─ src/
│  │  │  ├─ App.tsx
│  │  │  ├─ main.tsx
│  │  │  ├─ vite-env.d.ts
│  │  │  ├─ components/
│  │  │  │  ├─ AuthButtons.tsx
│  │  │  │  ├─ LoginForm.tsx
│  │  │  │  └─ UserProfile.tsx
│  │  │  ├─ context/
│  │  │  │  └─ AuthContext.tsx
│  │  │  ├─ hooks/
│  │  │  │  ├─ useAuth.ts
│  │  │  │  └─ useProfile.ts
│  │  │  ├─ firebase.ts
│  │  │  └─ styles/
│  │  ├─ public/
│  │  ├─ vite.config.ts
│  │  ├─ webpack.config.js
│  │  ├─ tsconfig.json
│  │  ├─ .env.example
│  │  └─ package.json
│  └─ mf-dash/
│     ├─ src/
│     │  ├─ App.tsx
│     │  ├─ main.tsx
│     │  ├─ vite-env.d.ts
│     │  ├─ components/
│     │  │  ├─ PostsTable.tsx
│     │  │  ├─ PostCard.tsx
│     │  │  └─ Sidebar.tsx
│     │  ├─ store/
│     │  │  ├─ zustandStore.ts
│     │  │  ├─ rtkStore.ts
│     │  │  └─ slices/
│     │  │     └─ postsSlice.ts
│     │  ├─ hooks/
│     │  │  └─ usePosts.ts
│     │  ├─ firebase.ts
│     │  └─ styles/
│     ├─ public/
│     ├─ vite.config.ts
│     ├─ webpack.config.js
│     ├─ tsconfig.json
│     ├─ .env.example
│     └─ package.json
└─ api/
   ├─ db.json
   ├─ package.json
   └─ README.md
```

---

## 🗓️ Plano de Desenvolvimento (14 Dias, ~1 Hora/Dia)

### **Dia 1 – Kick-off & Monorepo Setup**
*Objetivo: Estrutura inicial do projeto*
- Inicializar monorepo com Yarn Workspaces
- Criar diretórios: `apps/container`, `apps/mf-auth`, `apps/mf-dash`, `api`
- Criar 3 projetos Vite + React + TypeScript
- Configurar scripts `dev:all`, `build:all` e `install-all`
- ✅ **Commit:** "Initial monorepo setup with Vite React projects"

### **Dia 2 – Fake API com JSON Server**
*Objetivo: Backend mock pronto*
- Instalar `json-server` no workspace `api`
- Criar `db.json` com dados simulados (users, posts, profile)
- Adicionar script `start` para rodar json-server na porta 3000
- Testar endpoints: GET /users, /posts, /profile
- ✅ **Commit:** "Fake API with json-server configured"

### **Dia 3 – Material-UI Setup**
*Objetivo: Componentes UI padronizados*
- Instalar Material-UI, Emotion em todos os workspaces
- Criar tema global com cores e tipografia
- Configurar CssBaseline para estilos base
- Testar componentes Button, Card, TextField no container
- ✅ **Commit:** "Material-UI integration and theme setup"

### **Dia 4 – Container Shell & Roteamento**
*Objetivo: Shell funcionando com lazy loading*
- Instalar `react-router-dom@6`
- Configurar rotas: `/login`, `/dashboard/*`
- Implementar `React.lazy()` com `Suspense` para MFs
- Criar placeholders para AuthApp e DashApp
- ✅ **Commit:** "Container routing and MF placeholders with lazy loading"

### **Dia 5 – Module Federation Configuration**
*Objetivo: Micro-frontends comunicando*
- Instalar `@module-federation/webpack-5`
- Configurar webpack.config.js em cada projeto (Host/Remote)
- Configurar shared dependencies (react, react-dom, react-router-dom)
- Testar carregamento remoto dos MFs no console
- ✅ **Commit:** "Module Federation configured for all projects"

### **Dia 6 – Firebase Setup (Autenticação)**
*Objetivo: Credenciais OAuth prontas*
- Criar projeto no Firebase Console
- Ativar OAuth 2.0 (Google, Facebook, GitHub, LinkedIn)
- Configurar redirect URIs para localhost
- Criar `.env.local` em mf-auth com credenciais Firebase
- ✅ **Commit:** "Firebase authentication credentials configured"

### **Dia 7 – MF-Auth: Context API & React Query**
*Objetivo: Fluxo de login básico*
- Criar `AuthContext` com `createContext`
- Implementar `signIn()` e `signOut()` com Firebase
- Configurar `QueryClientProvider`
- Criar página /login com botões dos 4 provedores
- ✅ **Commit:** "Auth flow with Context API, React Query and social login"

### **Dia 8 – MF-Auth: UI com Material-UI**
*Objetivo: Tela de login profissional*
- Criar componentes: AuthButtons, LoginForm, UserProfile
- Usar MUI Card, Button, Avatar, TextField
- Implementar skeleton loader para perfil
- Lazy fetch do perfil com React Query após login
- ✅ **Commit:** "MF-Auth UI with Material-UI and profile lazy loading"

### **Dia 9 – MF-Dashboard: Zustand Setup**
*Objetivo: Estado local gerenciado*
- Criar `zustandStore.ts` com estado da UI (sidebarOpen, etc)
- Criar Zustand hooks: `useUIStore()`
- Integrar Provider do Zustand
- ✅ **Commit:** "Zustand store for UI state initialized"

### **Dia 10 – MF-Dashboard: Redux Toolkit**
*Objetivo: Estado de domínio com Redux*
- Criar slice `postsSlice.ts`
- Implementar thunk `fetchPosts()` (GET /api/posts)
- Configurar RTK store com slice
- Integrar `react-redux` provider
- ✅ **Commit:** "Redux Toolkit with posts slice and thunks"

### **Dia 11 – MF-Dashboard: UI com Material-UI**
*Objetivo: Dashboard funcional*
- Criar componentes: Sidebar, PostsTable, PostCard
- Usar MUI DataGrid para tabela de posts
- Implementar lazy loading de PostsTable (React.lazy)
- Listar posts usando `useSelector` do Redux
- ✅ **Commit:** "MF-Dashboard UI with Material-UI and lazy components"

### **Dia 12 – Integração & Cross-MF Communication**
*Objetivo: Tudo conectado*
- Criar Navbar global no container (exibe usuário)
- Implementar logout sincronizado entre MFs
- Cache invalidation com React Query após logout
- Reset do Redux/Zustand após logout
- ✅ **Commit:** "Cross-MF integration, shared Navbar and logout flow"

### **Dia 13 – Testes & Build**
*Objetivo: Testes + builds prontos*
- Configurar Vitest + Testing Library
- Escrever testes unitários básicos (componentes, hooks)
- Rodar `yarn build:all`
- Verificar bundles e remoteEntry.js
- ✅ **Commit:** "Unit tests and production build verified"

### **Dia 14 – Refino & Documentação Final**
*Objetivo: Projeto completo e documentado*
- Revisar código e remover console.logs
- Atualizar este README
- Adicionar instruções de deploy
- Commit final e tag v1.0
- ✅ **Commit:** "Final refactor, documentation and v1.0 release"

---

## 📊 Gerenciamento de Estado

### **MF-Auth: Context API + React Query**

```typescript
// AuthContext.tsx
import { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as firebase from 'firebase/auth'

interface AuthContextType {
  user: User | null
  signIn: (provider: AuthProvider) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (provider: AuthProvider) => {
    setLoading(true)
    try {
      const result = await firebase.signInWithPopup(auth, provider)
      setUser(result.user)
    } catch (error) {
      console.error('Sign in failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await firebase.signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Sign out failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value=>
      {children}
    </AuthContext.Provider>
  )
}
```

### **React Query: Lazy fetch do perfil**

```typescript
// hooks/useProfile.ts
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'

export function useProfile() {
  const { user } = useAuth()

  return useQuery(
    ['profile', user?.uid],
    async () => {
      const response = await fetch(`/api/profile?uid=${user?.uid}`)
      return response.json()
    },
    {
      enabled: !!user?.uid, // Só faz fetch se user existe
      staleTime: 1000 * 60 * 5, // 5 minutos
    }
  )
}
```

### **MF-Dashboard: Zustand + Redux Toolkit**

```typescript
// store/zustandStore.ts
import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
}))

// store/rtkStore.ts & slices/postsSlice.ts
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('http://localhost:3000/posts')
    return response.json()
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch posts'
      })
  },
})

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

---

## 🚀 Lazy Loading

### **1. Lazy Loading de Micro-frontends (Route-level)**

```jsx
// Container App.tsx
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'

const AuthApp = React.lazy(() => import('mfAuth/App'))
const DashApp = React.lazy(() => import('mfDash/App'))

const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
)

export function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AuthApp />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <DashApp />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  )
}
```

### **2. Lazy Loading de Componentes (Intra-MF)**

```jsx
// MF-Dashboard: Lazy load PostsTable
import { lazy, Suspense, useState } from 'react'
import { Button, Skeleton } from '@mui/material'

const PostsTable = lazy(() => import('./components/PostsTable'))

export function Dashboard() {
  const [showPosts, setShowPosts] = useState(false)

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setShowPosts(true)}
      >
        Ver Posts
      </Button>

      {showPosts && (
        <Suspense fallback={<Skeleton variant="rectangular" height={400} />}>
          <PostsTable />
        </Suspense>
      )}
    </div>
  )
}
```

### **3. Lazy Loading de Dados (Data Fetching)**

```typescript
// React Query: Lazy fetch após login
export function useProfile(uid: string | null) {
  return useQuery(
    ['profile', uid],
    async () => {
      const response = await fetch(`/api/profile?uid=${uid}`)
      return response.json()
    },
    { enabled: !!uid } // Só faz fetch se uid existe
  )
}

// Redux: Fetch sob demanda
export function PostsList() {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts()) // Chamada sob demanda
  }, [dispatch])

  if (loading) return <Skeleton />
  return (
    <Box>
      {items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  )
}
```

---

## 🎬 Setup Inicial Completo

### **Etapa 1: Criar Repositório no GitHub**

1. Acesse https://github.com/new
2. Repository name: `microfrontend-social-auth-spa`
3. Description: Social Login Micro-frontend SPA
4. Escolha **Public**
5. Clique em **Create repository**

### **Etapa 2: Abrir GitHub Codespace**

1. No repositório, clique **< > Code**
2. Clique em **Codespaces**
3. Clique em **Create codespace on main**
4. Aguarde o VS Code carregar

### **Etapa 3: Instalar Yarn**

```bash
npm install -g yarn
yarn --version
```

### **Etapa 4: Criar Estrutura de Pastas**

```bash
mkdir -p apps/container apps/mf-auth apps/mf-dash api
```

### **Etapa 5: Inicializar Monorepo**

```bash
yarn init -y
```

Edite o `package.json` raiz:

```json
{
  "name": "microfrontend-social-auth-spa",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["apps/*", "api"],
  "scripts": {
    "dev:all": "concurrently "yarn workspace api start" "yarn workspace container dev" "yarn workspace mf-auth dev" "yarn workspace mf-dash dev"",
    "dev:api": "yarn workspace api start",
    "dev:container": "yarn workspace container dev",
    "dev:mf-auth": "yarn workspace mf-auth dev",
    "dev:mf-dash": "yarn workspace mf-dash dev",
    "build:all": "yarn workspaces foreach run build",
    "test": "yarn workspaces foreach run test"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

```bash
yarn add -W concurrently
```

### **Etapa 6: Criar Projetos Vite**

```bash
# Container
cd apps/container
yarn create vite . --template react-ts
yarn install
cd ../..

# MF-Auth
cd apps/mf-auth
yarn create vite . --template react-ts
yarn install
cd ../..

# MF-Dashboard
cd apps/mf-dash
yarn create vite . --template react-ts
yarn install
cd ../..
```

### **Etapa 7: Criar API (json-server)**

```bash
cd api
yarn init -y
yarn add json-server
cd ..
```

Edite `api/package.json`:

```json
{
  "name": "api",
  "version": "1.0.0",
  "scripts": {
    "start": "json-server --watch db.json --port 3000"
  },
  "dependencies": {
    "json-server": "^0.17.4"
  }
}
```

### **Etapa 8: Criar db.json**

```bash
cat > api/db.json << 'EOF'
{
  "users": [
    {
      "id": "1",
      "uid": "user-001",
      "name": "João Silva",
      "email": "joao@example.com",
      "image": "https://i.pravatar.cc/150?img=1"
    },
    {
      "id": "2",
      "uid": "user-002",
      "name": "Maria Santos",
      "email": "maria@example.com",
      "image": "https://i.pravatar.cc/150?img=2"
    }
  ],
  "posts": [
    {
      "id": "1",
      "title": "Entendendo Micro-frontends",
      "body": "Um guia completo sobre arquitetura de micro-frontends com Module Federation.",
      "userId": "1",
      "createdAt": "2024-01-15"
    },
    {
      "id": "2",
      "title": "React Query vs SWR",
      "body": "Comparação entre bibliotecas de data fetching em React.",
      "userId": "2",
      "createdAt": "2024-01-16"
    }
  ],
  "profile": [
    {
      "uid": "user-001",
      "bio": "Desenvolvedor full-stack",
      "followers": 150,
      "following": 75
    }
  ]
}
EOF
```

### **Etapa 9: Instalar Dependências Principais**

```bash
# React Router no container
yarn workspace container add react-router-dom @types/react-router-dom

# Firebase + React Query no mf-auth
yarn workspace mf-auth add firebase @tanstack/react-query

# Zustand + Redux no mf-dash
yarn workspace mf-dash add zustand @reduxjs/toolkit react-redux @types/react-redux

# Material-UI em todos
yarn workspace container add @mui/material @emotion/react @emotion/styled
yarn workspace mf-auth add @mui/material @emotion/react @emotion/styled
yarn workspace mf-dash add @mui/material @emotion/react @emotion/styled

# Dependências globais
yarn add -W -D typescript @types/node
```

### **Etapa 10: Testar Setup**

```bash
# Terminal 1: API
yarn dev:api

# Terminal 2: Container
yarn dev:container

# Teste em http://localhost:5173
```

### **Etapa 11: Commit Inicial**

```bash
git config --global user.email "seu-email@example.com"
git config --global user.name "Seu Nome"
git add .
git commit -m "Initial monorepo setup with Vite React projects and json-server"
git push origin main
```

---

## 🔗 Endpoints da Fake API

| Método | Endpoint | Status | Descrição |
|--------|----------|--------|-----------|
| GET | `/users` | 200 | Lista todos os usuários |
| GET | `/users/:id` | 200 | Um usuário específico |
| POST | `/users` | 201 | Criar novo usuário |
| GET | `/posts` | 200 | Lista todos os posts |
| GET | `/posts/:id` | 200 | Um post específico |
| POST | `/posts` | 201 | Criar novo post |
| GET | `/profile?uid=user-001` | 200 | Perfil do usuário |

**Exemplos:**

```bash
# Listar usuários
curl http://localhost:3000/users

# Listar posts
curl http://localhost:3000/posts

# Perfil específico
curl "http://localhost:3000/profile?uid=user-001"

# Criar usuário
curl -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"name": "Novo Usuário", "email": "novo@example.com"}'
```

---

## 📦 Build para Produção

```bash
# Build todos os workspaces
yarn build:all

# Resultado:
# - apps/container/dist/
# - apps/mf-auth/dist/
# - apps/mf-dash/dist/

# Verificar tamanho dos bundles
ls -lh apps/*/dist/
```

---

## 🌐 Deploy

### **Vercel (Recomendado)**

1. Push seu repositório para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em **Import Project**
4. Selecione seu repositório
5. Configure:
   - **Build Command:** `yarn build:all`
   - **Output Directory:** `apps/container/dist`
   - **Root Directory:** `.` (deixe vazio)
6. Adicione variáveis de ambiente
7. Clique em **Deploy**

### **Netlify**

1. Crie arquivo `netlify.toml` na raiz:

```toml
[build]
  command = "yarn build:all"
  publish = "apps/container/dist"

[context.production.environment]
  VITE_API_URL = "https://sua-api.com"
```

2. Conecte seu repositório no [netlify.com](https://netlify.com)

---

## 🆘 Troubleshooting

### **Erro: "Port already in use"**

```bash
# Mudar porta em vite.config.ts
export default {
  server: {
    port: 5174
  }
}
```

### **Erro: "Module not found (remoteEntry)"**

```bash
rm -rf node_modules yarn.lock
yarn install
```

### **Erro: "Firebase credentials missing"**

```bash
# Criar .env.local com credenciais Firebase
cp apps/mf-auth/.env.example apps/mf-auth/.env.local
# Preencher com seus valores
```

### **Erro: "Cannot find module 'mfAuth/App'"**

- Verificar `webpack.config.js` do mf-auth
- Confirmar que está expondo o App
- Limpar cache: `rm -rf node_modules && yarn install`

### **JSON Server não inicia**

```bash
# Confirmar que db.json existe
ls api/db.json

# Tentar rodar diretamente
cd api && yarn start
```

---

## 📚 Recursos Úteis

- [React 18 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Material-UI (MUI)](https://mui.com/)
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [React Router v6](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Próximos Passos & Melhorias Futuras

- **Firebase Emulator:** Desenvolver offline com emuladores do Firebase
- **SSR:** Implementar Server-Side Rendering no container
- **CI/CD:** Automatizar builds com GitHub Actions
- **JWT Tokens:** Proteger endpoints da API com tokens
- **MSW:** Substituir json-server por Mock Service Worker
- **Testes E2E:** Adicionar testes com Playwright/Cypress
- **Temas:** Sistema de temas unificado (light/dark mode)
- **PWA:** Tornar a app Progressive Web App
- **Internacionalização:** Suporte a múltiplos idiomas (i18n)
- **Observabilidade:** Integrar logging e monitoring

---

## 🤝 Contribuindo

1. Faça um **Fork** do projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Commit: `git commit -m 'Add MinhaFeature'`
4. Push: `git push origin feature/MinhaFeature`
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está licenciado sob a **Licença MIT**. Veja [LICENSE](./LICENSE) para detalhes.

---

## 👤 Autor

**Seu Nome**
- GitHub: [@wendellGJ](http://github.com/wendellGJ)
- LinkedIn: [Wendell Guimarães Júnior] (www.linkedin.com/in/wendell-guimarães)
- Email: junior.wendell@hotmail.com

---

## 🙏 Agradecimentos

- React Community
- Firebase Team
- Material-UI Community
- Webpack Team
- Yarn Team
- Todos que contribuem com feedback e issues

---

**Desenvolvido com ❤️ e muita ☕**
