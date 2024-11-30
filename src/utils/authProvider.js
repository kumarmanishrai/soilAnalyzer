/* eslint-disable prettier/prettier */
/* eslint-disable quotes */

import React,{ createContext, useState } from "react";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPinLogin, setIsPinLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isPinLogin, setIsPinLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
