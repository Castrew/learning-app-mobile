import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken, deleteToken } from "@/secureStoreActions";

interface User {
  id: string;
  name: string;
  description: string | null;
  email: string;
  emailVerified: Date;
  image: string;
}

interface Session {
  sessionToken: string;
  userId: string;
  expires: Date;
}

interface GoogleUser {
  user: User;
  session: Session;
}

interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (googleUser: GoogleUser) => Promise<void>;
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
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSession = async () => {
    try {
      const token = await getToken("userToken");
      if (token) {
        const savedUser = JSON.parse(token);
        setGoogleUser(savedUser);
      }
    } catch (error) {
      console.error("Error loading session:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (googleUser: GoogleUser) => {
    setGoogleUser(googleUser);
    await saveToken("userToken", JSON.stringify(googleUser));
  };

  const logout = async () => {
    setGoogleUser(null);
    await deleteToken("userToken");
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user: googleUser?.user,
        isAuthenticated: !!googleUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
