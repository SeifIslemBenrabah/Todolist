import React from 'react'
import {ReactComponent as Home1 } from '../assets/Home1.svg'
import {ReactComponent as Home2 } from '../assets/Home2.svg'
import {ReactComponent as In } from '../assets/1.svg'
import {ReactComponent as  Fb} from '../assets/2.svg'
import {ReactComponent as  Insta } from '../assets/3.svg'
import {ReactComponent as Wats} from '../assets/4.svg'
import Taskscompleted from '../Components/Taskscompleted'
import Comment from './Comment'
import me from '../assets/me.png'
const Home = () => {
  return (
    <div className='bg-primary w-full h-screen top-0'>
      <div className='flex flex-col justify-center items-center gap-5'>
      <div className='flex flex-row justify-between items-center w-11/12 mt-2'>
        <h1 className='text-xl font-bold'>Logo</h1>
        <div className='flex flex-row font-montserrat text-lg items-center gap-5'>
          <a href='/signup' className='text-peach'>
            Sign up 
          </a>
          <a href='/login' className='bg-peach text-white px-4 py-2 rounded-lg shadow-lg'>
            Login
          </a>
        </div>
      </div>
      <div className='w-10/12 h-[0.5px] bg-peach'>
      </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col ml-20 mt-16 mb-28'>
        <p className='font-montserrat text-8xl text-secondary font-bold text-shadow-md line-clamp-none leading-none'>
        Take Control </p>
        <p className='font-montserrat font-bold text-shadow-md text-peach text-6xl ml-4 '>of Your Day</p>
        
        <div className='flex flex-row mt-8 gap-8 ml-4 items-center'>
          <div className='w-[0.5px] h-28 bg-black'></div>
          <h1 className='font-montserrat font-light text-xl'>Simplify Your To-Do List<br/>
              and Achieve More with <br/>
              Our Easy-to-Use <br/>
              Task Manager
          </h1>
        </div>
        <a href='/login'  className='bg-peach text-2xl font-montserrat text-white items-center w-40 rounded-lg flex justify-center py-2 shadow-xl mt-7 ml-4'>
          Get Started
          </a>
        </div>
        <div className='relative'>
        <Home1  style={{ width: '700px', height: '600px',position:'absolute',top:0,left:-160 }}/>
        </div>
      </div>
      <div className='flex flex-row items-center justify-between mx-20'>
        <Home2  style={{ width: '300px', height: '300px' }}/>
        <h1 className='text-4xl font-montserrat text-secondary text-shadow-md font-semibold'>
        Stop wasting time and start organizing <br/>
your tasks effectively. Join us today <br/>
and turn chaos into productivity!
        </h1>
      </div>
      <div className='flex flex-row'>
      <Taskscompleted/>
      <Taskscompleted/>
      <Taskscompleted/>
      </div>
      <div className='w-full mb-3 h-[72vh]'>
      <div className='w-7/12 mx-12 flex flex-col gap-48 relative'>
      <div className='-rotate-6 absolute left-24'>
        <Comment src={me} comment={'This app has truly transformed how I manage my tasks! I’m more organized and productive than ever before. Highly recommend!'} user={'Seifislem@gmail.com'}/>
      </div>
      <div className='rotate-6 absolute right-32 top-20'>
        <Comment src={me} comment={'This app has truly transformed how I manage my tasks! I’m more organized and productive than ever before. Highly recommend!'} user={'Seifislem@gmail.com'}/>
      </div>
      <div className='rotate-3 absolute top-56 left-36'>
        <Comment src={me} comment={'This app has truly transformed how I manage my tasks! I’m more organized and productive than ever before. Highly recommend!'} user={'Seifislem@gmail.com'}/>
      </div>
      </div>
      </div>
      <div className='bg-secondary h-[23vh] flex justify-center items-center'>
        <div className='w-8/12 flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-7 justify-center items-center'>
          <h1 className='font-montserrat text-white text-6xl'>Logo</h1>
          <div className='flex flex-row gap-4'>
            <Insta/>
            <Fb/>
            <In/>
            <Wats/>
          </div>
        </div>
        <h1 className='font-montserrat font-semibold text-white text-base'>
        Join thousands of satisfied users who <br/>
have transformed their productivity <br/>
with us. Your path to better <br/>
organization starts here!
        </h1>
          </div>
      </div>
    </div>
  )
}

export default Home
