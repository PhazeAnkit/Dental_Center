import { createContext, useContext, useState, type ReactNode } from "react";

type Role = "Admin" | "Patient" | null;

interface AuthContextType {
  user: { email: string; role: Role } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

const mockUsers = [
  { email: "admin@entnt.in", password: "admin123", role: "Admin" },
  { email: "john@entnt.in", password: "patient123", role: "Patient" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string) => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      const userObj = { email: found.email, role: found.role as Role };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
