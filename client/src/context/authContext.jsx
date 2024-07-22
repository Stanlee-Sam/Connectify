

import PropTypes from "prop-types";
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== 'null' ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  const login = async (inputs) => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', inputs, {
        withCredentials: true,
      });
  
      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);
  
        
        const userRes = await axios.get('http://localhost:8000/api/users/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const user = userRes.data;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
        } else {
          console.error('User data is undefined');
        }
      } else {
        console.error('Token is undefined');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };
  

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/logout', {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
