import { createContext, useContext, useState } from "react";
import { login, register } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const loginUser = async (email, password) => {
    const response = await login(email, password);

    const userData = response.user;
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", response.token);
  };

  const registerUser = async (firstName, lastName, email, password) => {
    const response = await register(firstName, lastName, email, password);

    const userData = response.user;
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, setUser,  registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
