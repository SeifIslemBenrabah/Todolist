import React from 'react'
import {ReactComponent as PSignup } from '../assets/Signup.svg'
const Signup = () => {
  return (
    <div className='relative bg-primary'>
      <div className='absolute top-0 left-6'>
        <PSignup style={{width:'600px',height:'590px'}}/>
      </div>
      <div className='absolute w-full'>
        <div className='flex justify-center mt-6'>
        <h1 className='font-montserrat font-light text-8xl text-white text-shadow-lg'>Don’t let <span className='text-secondary'>time slip away!</span></h1>
        </div>
        <div className='absolute w-1/2 right-0'>
        <div className='flex flex-col items-center justify-center mt-7'>
          <h1 className='font-montserrat font-semibold text-2xl'>Please Fill out form to Register!</h1>
          <form action="/submit" className="flex flex-col gap-2 w-9/12">
        <label htmlFor="name" className="font-montserrat font-semibold">User Name:</label>
        <input type="text" id="name" name="name" className="border border-secondary p-1" />
        <label htmlFor="name" className="font-montserrat font-semibold">Email:</label>
        <input type="text" id="name" name="name" className="border border-secondary p-1" />
        <label htmlFor="name" className="font-montserrat font-semibold">Password:</label>
        <input type="text" id="name" name="name" className="border border-secondary p-1" />
        <label htmlFor="email" className="font-montserrat font-semibold mt-2">Confirm Password:</label>
        <input type="email" id="email" name="email" className="border border-secondary p-1" />
        <input type="submit" value="Login" className="bg-secondary flex justify-center p-1 font-montserrat text-white mt-5" />
          </form>
          <h1 className='font-montserrat mt-5 font-medium'>Already have an account?<a className='font-semibold' href='/Login'> Log in</a></h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
