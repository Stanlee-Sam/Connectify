import PropTypes from "prop-types";
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser && storedUser !== 'null' ? JSON.parse(storedUser) : null;
  });

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; 

        if (decoded.exp < currentTime) {
          
          console.warn('Token expired, clearing user session');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
      }
    }
  }, []); 


  useEffect(() => {
    console.log('Current user updated:', currentUser);
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  const login = async (inputs) => {
    try {
      const res = await axios.post('/api/auth/login', inputs, {
        withCredentials: true,
      });

      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

        const userRes = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = userRes.data;
        console.log('Fetched user data:', user); 
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
      await axios.post('/api/auth/logout', {}, {
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

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
