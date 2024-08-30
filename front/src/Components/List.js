import React, { useState,useEffect } from 'react';
import { Link, useNavigate ,Outlet } from 'react-router-dom';
import { AuthData } from '../Auth/AuthWrapper';
import axios from 'axios';
const List = () => {
    const navigate = useNavigate();
    const { user, logout } = AuthData();
    const [Projects, setProjects] = useState(true);
    const [Tasks, setTasks] = useState(true);
    const [listprojects,setlistprojects] =useState([])
    const [listtasks,setlisttasks]=useState([])
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:8080/project');
                console.log('Project data:', res.data); 
                if (Array.isArray(res.data.projects)) {
                    setlistprojects(res.data.projects);
                } else {
                    console.log('Unexpected response format:', res.data);
                }
            } catch (err) {
                console.log('Error fetching projects:', err);
            }
        };
        const fatchtasks = async () =>{
            try{
                const res = await axios.get('http://localhost:8080/task');
                console.log('tasks data:', res.data)
                if (Array.isArray(res.data.tasks)) {
                    setlisttasks(res.data.tasks);
                } else {
                    console.log('Unexpected response format:', res.data);
                }
            }
            catch(err){
                console.log('err in fatching tasks',err)
            }
        }
        fetchProjects();
        fatchtasks();
    }, []);
    const handleProjects = () => {
        setProjects(!Projects);
    };

    const handleTasks = () => {
        setTasks(!Tasks);
    };

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
                    <div className='flex flex-col'>
                        <Link to='Dashboard'>
                            <h1 className='font-montserrat text-xl ml-10'>Dashboard</h1>
                        </Link>
                        <button className='flex flex-row justify-between mx-10' onClick={handleProjects}>
                            <h1 className='font-montserrat text-xl'>Projects</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${Projects ? 'rotate-0' : 'rotate-180'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <div className={`${Projects ? 'block' : 'hidden'} flex flex-col gap-2 ml-14 mt-4`}>
                            <Link to='Allprojects'><h1 className='font-montserrat text-lg'>All Projects</h1></Link>
                            {listprojects.map((project, index) => (
                                <a key={index} className='font-montserrat text-lg'>Project {project.name}</a>
                            ))}
                        </div>
                        <button className='flex flex-row justify-between mx-10' onClick={handleTasks}>
                            <h1 className='font-montserrat text-xl'>Tasks</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${Tasks ? 'rotate-0' : 'rotate-180'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <div className={`${Tasks ? 'block' : 'hidden'} flex flex-col gap-2 ml-14 mt-4`}>
                            <Link to='Alltasks'><h1 className='font-montserrat text-lg'>All Tasks</h1></Link>
                            {listtasks.map((task, index) => (
                                <a key={index} className='font-montserrat text-lg'>Task {task.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 h-[27vh] w-full'>
                    <div className='flex items-center justify-center'>
                        <div className='w-9/12 h-[0.5px] bg-black'></div>
                    </div>
                    <button onClick={handleLogout} className='font-montserrat text-xl flex items-center'>
                        <h1>Log Out</h1>
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
