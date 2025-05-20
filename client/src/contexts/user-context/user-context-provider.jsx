import React, { useEffect, useState } from "react";
import { UserContext } from "./user-context";
import { jwtDecode } from "jwt-decode";

const tokenValue = localStorage.getItem("token");

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);

  const getInitialToken = () => {
    return token ? jwtDecode(token) : null;
  };

  const [user, setUser] = useState(getInitialToken);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } else {
      setUser(null);
    }
  }, [token]);

  const handleUserLogin = (newToken) => {
    localStorage.setItem("token", newToken);
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
