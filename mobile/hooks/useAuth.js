import { useState, useEffect } from 'react';
import { getToken, getUser, removeToken, removeUser } from '../hooks/useStorage';

export const useAuth = () => {
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

  return { token, user, loading, logout };
};
