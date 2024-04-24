import React, { createContext, useContext, useState } from "react";

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [loggedInData, setLoggedInData] = useState([]);

  return (
    <UserContext.Provider value={{ loggedInData, setLoggedInData }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
