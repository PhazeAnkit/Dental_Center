import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

type Role = "Admin" | "Patient" | null;

interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  patientId?: string;
}

interface AuthContextType {
  user: Omit<User, "password"> | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user"); 
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const found = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const userObj: Omit<User, "password"> = {
        id: found.id,
        email: found.email,
        role: found.role,
        ...(found.patientId && { patientId: found.patientId }),
      };

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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
