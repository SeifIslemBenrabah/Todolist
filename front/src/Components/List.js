import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthData } from '../Auth/AuthWrapper';
const List = () => {
    const navigate = useNavigate();
    const {user} =AuthData();
    const [Projects,setProjects]=useState(true)
    const handleProjects =()=>{
        setProjects(!Projects);
    }
    const projects =[
        {
            id:1
        },
        {
            id:2
        }
    ]
    const [Tasks,setTasks]=useState(true)
    const handleTasks =()=>{
        setTasks(!Tasks);
    }
    const tasks =[
        {
            id:1
        },
        {
            id:2
        }
    ]
    const handleLogout =()=>{
        user.isAuthenticated=false;
        navigate('http://localhost:3000')
    }
  return (
    <div className='relative bg-primary w-full h-screen'>
      <div className='absolute w-3/12 h-screen shadow-lg bg-primary'>
      <div className='w-full flex flex-col'>
        <h1 className='flex justify-center font-montserrat text-2xl font-light my-4'>Logo</h1>
        <div className='flex items-center justify-center'>
        <div className='w-9/12 h-[0.5px] bg-black '></div>
        </div>
        <div className='flex flex-col'>
            <Link to='/Dashboard'><h1 className='font-montserrat text-xl ml-10' >Dashboard</h1> </Link>
            <button className='flex flex-row justify-between mx-10' onClick={handleProjects}>
                <h1 className='font-montserrat text-xl'>Projects</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-6  ${Projects?'rotate-0':'rotate-180'}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
            </button>
            <div className={`${Projects?'block':'hidden'} flex flex-col gap-2 ml-14 mt-4`}>
                <Link><h1 className='font-montserrat text-lg'>All Projects</h1></Link>
                {projects.map((project,index)=>(
                    <a className='font-montserrat text-lg'>Project {project.id}</a>
                    ))}
            </div>
            <button className='flex flex-row justify-between mx-10' onClick={handleTasks}>
                <h1 className='font-montserrat text-xl'>Tasks</h1>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-6  ${Tasks?'rotate-0':'rotate-180'}`}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
            </button>
            <div className={`${Tasks?'block':'hidden'} flex flex-col gap-2 ml-14 mt-4`}>
                <Link><h1 className='font-montserrat text-lg'>All Projects</h1></Link>
                {tasks.map((task,index)=>(
                    <a className='font-montserrat text-lg'>Project {task.id}</a>
                    ))}
            </div>
        </div> 
      </div>
      <div className='absolute bottom-0 h-[27vh] w-full'>
      <div className='flex items-center justify-center'>
        <div className='w-9/12 h-[0.5px] bg-black '></div>
        </div>
        <button onCanPlay={handleLogout} className='font-montserrat text-xl flex items-center'>
            <h1>Log Out</h1>
        </button>
      </div>
      </div>
      <div className='absolute top-0 right-0 w-9/12 h-screen'>
        <h1 className='font-montserrat font-extrabold text-3xl text-black mt-6 ml-8'>Welcome back,{user.username}!</h1>
        <div className='w-11/12 h-[0.5px] bg-secondary mt-2 shadow-lg'></div>
        <div className='w-full h-[90.5vh]'>
            
        </div>
      </div>
    </div>
  )
}

export default List
