// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser } from "../api/auth";
import api from "../api/axios"; // your axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Always fetch fresh user from DB — this includes latest avatar, city, etc.
        const res = await api.get("/users/me");
        const freshUser = res.data.data;         // your sendSuccess wraps in .data
        setUser(freshUser);
        localStorage.setItem("user", JSON.stringify(freshUser)); // keep in sync
      } catch {
        // Token invalid/expired — clean up
        localStorage.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async ({ email, password, role }) => {
    setError(null);
    const data = await loginUser({ email, password, role });
    const { user, accessToken, refreshToken } = data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    return user;
  };

  const register = async (formData) => {
    setError(null);
    const data = await registerUser(formData);
    const { user, accessToken, refreshToken } = data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    return user;
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};