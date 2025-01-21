import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken, deleteToken } from "@/secureStoreActions";

interface User {
  name: string;
  email: string;
  picture?: string;
  [key: string]: any;
}

interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSession = async () => {
    try {
      const token = await getToken("userToken");
      if (token) {
        const savedUser = JSON.parse(token);
        setUser(savedUser.user[0]);
      }
    } catch (error) {
      console.error("Error loading session:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (user: User) => {
    setUser(user.user[0]);
    await saveToken("userToken", JSON.stringify(user));
  };

  const logout = async () => {
    setUser(null);
    await deleteToken("userToken");
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
