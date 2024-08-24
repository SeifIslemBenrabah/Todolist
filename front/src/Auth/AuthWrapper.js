import React,{ createContext, useContext, useState } from 'react'
import axios from 'axios'
import  RenderRoutes from "../Components/structure/RenderRoutes";
const AuthContext =createContext();
export const AuthData = () => useContext(AuthContext)
const AuthWrapper = () => {
    const [user,setUser] =useState({name:'',isAuthenticated:true})
    const login = async (userName, password) => {

        try {
          const response = await axios.post('', {
            userName,
            password,
          });
    
          console.log('Login successful:', response.data);
          setUser({name: userName, isAuthenticated: true})
        } catch (error) {
          console.error('Error logging in:', error.response ? error.response.data : error.message);
        }
      };
      const logout = () => {

        setUser({...user, isAuthenticated: true})
   }
  return (
    <AuthContext.Provider value={{user, login, logout}}>
                    <>
                         <RenderRoutes />
                    </>
                    
               </AuthContext.Provider>
  )
}

export default AuthWrapper
