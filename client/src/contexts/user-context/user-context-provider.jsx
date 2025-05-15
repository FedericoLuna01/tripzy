import React, { useState } from "react";
import { UserContext } from "./user-context";
import { jwtDecode } from "jwt-decode";

const tokenValue = localStorage.getItem("token");

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);
  const [user, setUser] = useState(null);

  const handleUserLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    const decodedToken = jwtDecode(newToken);
    setUser(decodedToken);
    setToken(newToken);
  };
  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleUserLogin, handleUserLogout }}>
      {children}
    </UserContext.Provider>
  );
};
