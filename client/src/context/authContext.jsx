import  { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || true // remember to change this later
  );

  const login = () => {
    setCurrentUser({
        id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
  
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
