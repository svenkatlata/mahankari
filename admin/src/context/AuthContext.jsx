import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on app load and set token if present
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const res = await api.get("/user/me");
          setUser(res.data.user);
        } catch (err) {
          setUser(null);
          localStorage.removeItem("accessToken");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (userData) => {
    const result = await api.post("/user/login", userData);
    if (result.status === 200 && result.data.success) {
      setUser(result.data.user);
      if (result.data.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${result.data.accessToken}`;
      }
      return;
    }
    return result.data.message;
  };

  const logout = async () => {
    await api.post("/user/logout");
    setUser(null);
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
