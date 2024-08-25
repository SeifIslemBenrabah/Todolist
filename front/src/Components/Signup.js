import React, { useState } from 'react';
import { ReactComponent as PSignup } from '../assets/Signup.svg';
import axios from 'axios';

const Signup = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const handlesubmit = (e) => {
    e.preventDefault(); 
    if (name && email && password && password === cpassword) {
      axios.post('http://localhost:8080/user', {
        name: name,
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res);
        console.log('sec');
      })
      .catch(err => console.log(err));
    } else {
      console.log('err');
    }
  };

  return (
    <div className='relative bg-primary'>
      <div className='absolute top-0 left-6'>
        <PSignup style={{width: '600px', height: '590px'}} />
      </div>
      <div className='absolute w-full'>
        <div className='flex justify-center mt-6'>
          <h1 className='font-montserrat font-light text-8xl text-white text-shadow-lg'>
            Don’t let <span className='text-secondary'>time slip away!</span>
          </h1>
        </div>
        <div className='absolute w-1/2 right-0'>
          <div className='flex flex-col items-center justify-center mt-7'>
            <h1 className='font-montserrat font-semibold text-2xl'>Please Fill out form to Register!</h1>
            <form className="flex flex-col gap-2 w-9/12" onSubmit={handlesubmit}>
              <label htmlFor="name" className="font-montserrat font-semibold">User Name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="border border-secondary p-1" 
                value={name} 
                onChange={e => setname(e.target.value)} 
              />
              <label htmlFor="email" className="font-montserrat font-semibold">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="border border-secondary p-1" 
                value={email} 
                onChange={e => setemail(e.target.value)} 
              />
              <label htmlFor="password" className="font-montserrat font-semibold">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="border border-secondary p-1" 
                value={password} 
                onChange={e => setpassword(e.target.value)} 
              />
              <label htmlFor="cpassword" className="font-montserrat font-semibold mt-2">Confirm Password:</label>
              <input 
                type="password" 
                id="cpassword" 
                name="cpassword" 
                className="border border-secondary p-1" 
                value={cpassword} 
                onChange={e => setcpassword(e.target.value)} 
              />
              <input 
                type="submit" 
                value="Register" 
                className="bg-secondary flex justify-center p-1 font-montserrat text-white mt-5" 
              />
            </form>
            <h1 className='font-montserrat mt-5 font-medium'>
              Already have an account?
              <a className='font-semibold' href='/Login'> Log in</a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
