import React, { useState, useReducer } from 'react';
import { ReactComponent as Plogin } from '../assets/Login.svg';
import { useNavigate } from 'react-router-dom';
import { AuthData } from "../Auth/AuthWrapper";

const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [formData, setFormData] = useReducer(
    (formData, newItem) => ({ ...formData, ...newItem }),
    { userName: "", password: "" }
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = async (e) => {
    e.preventDefault(); 
    try {
      await login(formData.userName, formData.password);
      navigate("/list"); 
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className='relative bg-primary top-0'>
      <div className='absolute right-0 top-0 w-2/6 bg-secondary h-screen shadow-2xl'></div>
      <div className='absolute right-52 top-16'>
        <Plogin style={{ width: '500px', height: '500px' }} />
      </div>
      <div className='absolute w-full -right-28 top-20'>
        <h1 className='font-montserrat text-8xl font-medium mb-9'>Welcome Back!</h1>
        <div className='w-2/5'>
          <form className="flex flex-col gap-2 w-11/12" onSubmit={doLogin}>
            <label htmlFor="name" className="font-montserrat font-semibold">User Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="border border-secondary p-1" 
              value={formData.userName}
              onChange={(e) => setFormData({ userName: e.target.value })}
            />
            <label htmlFor="password" className="font-montserrat font-semibold mt-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="border border-secondary p-1" 
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })} 
            />
            {errorMessage && (
              <div className="text-red-700">{errorMessage}</div>
            )}
            <input 
              type="submit" 
              value="Login" 
              className="bg-secondary flex justify-center p-1 font-montserrat text-white mt-5" 
            />
          </form>
        </div>
        <h1 className='font-montserrat mt-5 font-medium'>
          Don’t have an account? <a className='font-semibold' href='/Signup'>Register</a>
        </h1>
      </div>
    </div>
  );
};

export default Login;
