import React, { useState,useEffect } from 'react';
import { Link, useNavigate ,Outlet } from 'react-router-dom';
import { AuthData } from '../Auth/AuthWrapper';
import axios from 'axios';
const List = () => {
    const navigate = useNavigate();
    const { user, logout } = AuthData();
    const [listprojects,setlistprojects] =useState([])
    const [listtasks,setlistTasks]=useState([])
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/project/user/${user.id}`);
                if (Array.isArray(res.data.projects)) {
                    setlistprojects(res.data.projects);
                } else {
                    console.log('Unexpected response format:', res.data);
                }
            } catch (err) {
                console.log('Error fetching projects:', err);
            }
        };

        fetchProjects();
        const fatchtasks = async()=>{
            try{
                const res =await axios.get(`http://localhost:8080/task/user/${user.id}`)
                if (Array.isArray(res.data)) {
                    setlistTasks(res.data);
                } else {
                    console.log('Unexpected response format:', res.data);
                }
                console.log(res)
            }
            catch(err){
                console.log('Error fetching tasks:', err.message);
            }
        }
        fatchtasks();
    }, [user.id]);
    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login'); // Redirect to the login page
    };
    console.log(user)
    return (
        <div className='relative bg-primary w-full h-screen'>
            <div className='absolute w-3/12 h-screen shadow-lg bg-primary'>
                <div className='w-full flex flex-col'>
                    <h1 className='flex justify-center font-montserrat text-2xl font-light my-4'>Logo</h1>
                    <div className='flex items-center justify-center'>
                        <div className='w-9/12 h-[0.5px] bg-black'></div>
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        <Link to='Dashboard' className='font-montserrat text-xl flex flex-row ml-10 gap-2 mt-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                            </svg>
                            <h1 className='font-montserrat text-xl font-bold'>Dashboard</h1>
                        </Link>
                        <Link to='Allprojects' className='font-montserrat text-xl flex flex-row ml-10 gap-2 mt-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                            <h1 className='font-montserrat text-xl font-bold'>All Projects</h1>
                        </Link>
                            {listprojects.map((project, index) => (
                                <Link to={`${project._id}`} key={index} className='font-montserrat text-xl flex flex-row ml-16 gap-2 mt-2'>Project {project.name}</Link>
                            ))}
                        <Link to='Alltasks' className='font-montserrat text-xl flex flex-row ml-10 gap-2 mt-5'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                            </svg>
                            <h1 className='font-montserrat text-xl font-bold'>All Tasks</h1>
                        </Link>
                    </div>
                </div>
                <div className='absolute bottom-0 h-[27vh] w-full'>
                    <div className='flex items-center justify-center'>
                        <div className='w-9/12 h-[0.5px] bg-black'></div>
                    </div>
                    <button onClick={handleLogout} className='font-montserrat text-xl flex flex-row justify-center items-center gap-2 mt-5 ml-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        <h1 className='font-montserrat text-xl font-bold mt-[2px] '>Log Out</h1>
                    </button>
                </div>
            </div>
            <div className='absolute top-0 right-0 w-9/12 h-screen'>
                <h1 className='font-montserrat font-extrabold text-3xl text-black mt-6 ml-8'>Welcome back, {user.name}!</h1>
                <div className='w-11/12 h-[0.5px] bg-secondary mt-2 shadow-lg'></div>
                <div className='w-full h-[90.5vh]'>
                   <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default List;
