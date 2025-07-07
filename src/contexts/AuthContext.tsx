import { createContext, useState, type ReactNode, useContext } from "react";

type Role = "Admin" | "Patient" | null;

interface AuthContextType {
  user: { role: Role; email: string } | null;
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
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const login = (email: string, password: string) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ role: found.role as Role, email: found.email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
