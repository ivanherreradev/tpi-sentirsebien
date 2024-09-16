import React, { createContext, useState } from "react";
import { loginPost } from "../utils/constants/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    return { token, email };
  });

  const login = async (email, password) => {
    try {
      const response = await fetch(loginPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.result) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        setAuth({ token: data.token, email });

        return { success: true };
      } else {
        return { success: false, errors: data.errors };
      }
    } catch (error) {
      return { success: false, errors: [error.message] };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setAuth({ token: null, email: null });
  };

  const value = {
    auth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
