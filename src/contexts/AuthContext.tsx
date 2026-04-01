import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_BASE_URL } from "@/config/api";

interface AuthContextType {
  user: any | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    if (stored) {
      setUser(JSON.parse(stored));
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) return { error: new Error(data.error || 'Invalid credentials') };
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      localStorage.setItem('admin_token', data.token);
      setUser(data.user);
      setIsAdmin(true);
      return { error: null };
    } catch (err: any) {
      return { error: new Error(err.message || 'Network error') };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
