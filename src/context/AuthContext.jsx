import React, { createContext, useState, useEffect } from "react";
import { API } from "../utils/constants/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Retrieve user data from localStorage
  });

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    return { token, email };
  });

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API}/api/Authentication/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data) {
        console.log(data)

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in localStorage
        setAuth({ token: data.token, email });
        setUser(data.user); // Set user data in state
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
    localStorage.removeItem("user"); // Remove user data from localStorage
    setAuth({ token: null, email: null });
    setUser(null); // Clear user data from state
  };

  const value = {
    auth,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
