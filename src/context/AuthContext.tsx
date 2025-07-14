import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  name: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 👈 loading flag

  useEffect(() => {
    const loadUser = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const email = await AsyncStorage.getItem('userEmail');
        const password = await AsyncStorage.getItem('userPassword');
        if (name && email && password) {
          setUser({ name, email, password });
        }
      } catch (error) {
        console.log('Failed to load user from AsyncStorage:', error);
      } finally {
        setLoading(false); // ✅ Set loading to false when done
      }
    };
    loadUser();
  }, []);

  const login = async (name: string, email: string, password: string) => {
    setUser({ name, email, password });
    await AsyncStorage.setItem('userName', name);
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.multiRemove(['userName', 'userEmail', 'userPassword']);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
