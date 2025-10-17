import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthButtons: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>
            Olá, {user.name} ({user.email})
          </p>
          <button
            onClick={logout}
            style={{
              padding: '10px',
              margin: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={login}
          style={{
            padding: '10px',
            margin: '5px',
            borderRadius: '5px',
            border: '1px solid #007bff',
            backgroundColor: '#007bff',
            color: 'white',
          }}
        >
          Login com Google (Dummy)
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
