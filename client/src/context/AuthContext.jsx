import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Create custom hooks
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // <-- you forgot to return it
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    // hydrate user if you stored it before
    (() => {
      try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    })()
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Endpoint we need to hit to get this data
  const API_URL =
    "https://e-commerce-backend-beta-lemon.vercel.app/api/auth" ||
    "http://localhost:3001";

  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // --- helpers ---
  const saveSession = (tokenValue, userValue) => {
    setToken(tokenValue);
    setUser(userValue);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userValue));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // --- Special functions being sent out ---
  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);

      // response shape matches your controller
      saveSession(data.token, data.user);
      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);

      saveSession(data.token, data.user);
      return data;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!token) return null;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);

      if (data?.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    } catch (e) {
      // token likely invalid/expired — log out quietly
      clearSession();
      setError(e.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    clearSession();
  };

  const contextValue = {
    // States
    user,
    token,
    isLoading,
    error,

    // functions
    register,
    login,
    fetchProfile,
    logout,

    // Auth Check
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
