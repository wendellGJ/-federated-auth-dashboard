import './App.css'; // Mantenha o CSS padrão do Vite
import { AuthProvider } from './context/AuthContext';
import AuthButtons from './components/AuthButtons';

function App() {
  return (
    <AuthProvider>
      <div
        style={{
          padding: '20px',
          border: '2px solid blue',
          borderRadius: '8px',
          margin: '20px',
          backgroundColor: '#e6f7ff',
        }}
      >
        <h2>Micro-frontend de Autenticação</h2>
        <AuthButtons />
      </div>
    </AuthProvider>
  );
}

export default App;
