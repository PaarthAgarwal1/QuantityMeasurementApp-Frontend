import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Restore user on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // ⛔ Check token expiry
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            token,
            username: decoded.sub, // 👈 Spring Boot default
          });
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      setUser({
        token,
        username: decoded.sub,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  // ✅ SIGNUP
  const signup = async (data) => {
    try {
      await api.post("/auth/signup", data);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      throw err;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);