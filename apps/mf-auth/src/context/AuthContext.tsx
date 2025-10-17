import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const login = () => {
    setUser({ id: '123', name: 'Usuário Teste', email: 'teste@example.com' });
    console.log('Login efetuado (dummy)');
  };

  const logout = () => {
    setUser(null);
    console.log('Logout efetuado (dummy)');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
