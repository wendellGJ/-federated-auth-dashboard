import React, { Suspense } from 'react';
import './App.css';

const AuthButtons = React.lazy(() => import('mf_auth/AuthButtons'));

function App() {
  return (
    <div
      style={{
        padding: '30px',
        border: '2px solid green',
        borderRadius: '10px',
        margin: '30px',
        backgroundColor: '#e6ffe6',
      }}
    >
      <h1>Container Principal (Host)</h1>
      <Suspense fallback={<div>Carregando autenticação...</div>}>
        <AuthButtons />
      </Suspense>
      {/* Aqui é onde outros micro-frontends e o restante da aplicação serão renderizados */}
    </div>
  );
}

export default App;
