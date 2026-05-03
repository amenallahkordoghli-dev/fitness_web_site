import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔥 récupérer user depuis cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include"
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setUser(data);

      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // ✅ login (pas besoin token)
  const login = (userData) => {
    setUser(userData);
  };

  // ✅ logout
  const logout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    setUser(null);
    
  };

  // ✅ auth basé uniquement sur user
  const isAuth = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}