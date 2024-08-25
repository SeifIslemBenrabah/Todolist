import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import RenderRoutes from "../Components/structure/RenderRoutes";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

const AuthWrapper = () => {
  const [user, setUser] = useState({ name: '', isAuthenticated: false });

  const login = async (userName, password) => {
    if (userName && password) {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          name: userName,
          password: password,
        });
        console.log(response);
        console.log('Login successful');
        setUser({ name: userName, isAuthenticated: true });
      } catch (error) {
        throw new Error(error.response?.data?.msg || "An error occurred during login");
      }
    } else {
      throw new Error('Please fill in both fields');
    }
  };

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <RenderRoutes />
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
