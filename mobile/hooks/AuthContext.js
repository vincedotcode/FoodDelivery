import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, getUser, removeToken, removeUser } from '../hooks/useStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = await getToken();
      const storedUser = await getUser();
      setToken(storedToken);
      setUser(storedUser);
      setLoading(false);
    };
    loadStoredData();
  }, []);

  const logout = async () => {
    await removeToken();
    await removeUser();
    setToken(null);
    setUser(null);
  };

  const login = async (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, logout, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
