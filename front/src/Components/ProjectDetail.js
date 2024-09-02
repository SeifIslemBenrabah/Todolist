import React ,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ProjectDetail = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { ProjectId } = useParams();
    const [Project, setProject] = useState({
        name:'',
        description:'',
        tasks:[],
    });
    const [addt, setopenaddt] = useState(false);
    const [tasks,settasks] = useState([])
    const [Tname, setTname] = useState('');
    const [Tdes, setTdes] = useState('');
    const [deletepopup,setdeletepopup]=useState(false)
    const [taskd,settaskd]=useState({})
    useEffect(()=>{
        const fatchProject = async ()=>{
            try{
                const res = await axios.get(`http://localhost:8080/project/${ProjectId}`)
                setProject(res.data)
                console.log(Project)
            }
            catch(err){
                console.log(err)
            }
        }
        fatchProject();
        const fatchtasks = async () =>{
            try{
                const res =await axios.get(`http://localhost:8080/task/${ProjectId}`)
                settasks(res.data)
                console.log('tasks array:',tasks)
            }
            catch(err){
                console.log(err)
            }
        }
        fatchtasks();
    },[ProjectId])
    const handleStatusChange = async(task,status)=>{
        try{
            const res = await axios.put(`http://localhost:8080/task/${task._id}`,{
                name: task.name,
                description: task.description,
                status: status
            })
            console.log(res)
        }
        catch(err){
            console.log(err)
        }
    }
    const handledeletetask = async(id)=>{
        try{
            await axios.delete(`http://localhost:8080/task/${id}`)
            setdeletepopup(false)
            settasks((prevtasks) => prevtasks.filter((t) => t._id !== id))
        }catch(err){
            console.log(err)
        }
    }
    const handleAddTask = async (id) => {
        try {
            await axios.post('http://localhost:8080/task', {
                name: Tname,
                description: Tdes,
                project: id,
                user: user.id
            });
            setopenaddt(false);
            setTname('');
            setTdes('');
            
        } catch (error) {
            console.log('Error in adding task', error);
        }
    };
    const handleClickOadd = () => {
        setopenaddt(true);
    };
    const handledeleteopen = (t) =>{
        setdeletepopup(true)
        settaskd(t)
    }
    const handledeleteclose = ()=>{
        setdeletepopup(false)
        settaskd({})
    }
  return (
    <div>
        <div className='flex justify-center mt-6'>
        <div className='w-10/12 bg-white rounded-lg shadow-lg flex flex-col gap-3'>
            <div className='flex flex-row justify-between mx-10'>
                <h1 className='font-montserrat text-xl font-bold'>
                    Project:{Project.name}
                </h1>
                <h1 className='font-montserrat text-xl font-bold'>
                    Tasks:{Project.tasks.length}
                </h1>
            </div>
            <div className='mx-10'>
                <h1 className='font-montserrat text-xl font-bold'>Description:</h1>
                <p className='font-montserrat text-lg ml-4'>
                    {Project.description}
                </p>
            </div>
        </div>
        </div>
        <div className='flex justify-center mt-6'>
            <button
            className='w-10/12 bg-peach p-2 rounded-lg shadow-lg font-montserrat text-white font-semibold flex flex-row gap-2 justify-center' 
            onClick={handleClickOadd}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Task
            </button>
        </div>
        <div className='grid grid-cols-3 items-center mt-10 gap-5 mx-5'>
            {tasks.map((task,index)=>(
                <div className='bg-white rounded-xl shadow-lg relative'>
                    <div className='absolute top-2 right-2'>
                    <button
                    className='bg-red-300 rounded-full p-0' 
                    onClick={()=>handledeleteopen(task)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-700">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-8 mt-3 ml-3'>
                        <h1 className='font-montserrat text-xl font-bold'>
                        Task:{task.name}
                        </h1>
                        </div>
                        <div className='flex flex-row ml-3'>
                            <h1 className='font-montserrat text-xl font-bold'>
                        status:
                            </h1>
                            <div className='rounded-xl flex flex-row overflow-hidden mt-[2px] ml-1'>
                                <button className={` p-1 font-montserrat text-sm font-semibold ${task.status === 'to do'?'bg-white text-blue-500': 'bg-blue-300 text-white'}`} 
                                onClick={() => handleStatusChange(task,'to do')}
                                >
                                    To Do
                                </button>
                                <button className={` p-1 font-montserrat text-sm font-semibold ${task.status === 'in progress'?'bg-white text-peach': 'bg-peach text-white'}`}
                                onClick={() => handleStatusChange(task,'in progress')}
                                >
                                    in progress
                                </button>
                                <button className={` p-1 font-montserrat text-sm font-semibold ${task.status === 'complete'?'bg-white text-green-400': 'bg-green-400 text-white'}`}
                                onClick={() => handleStatusChange(task,'complete')}
                                >
                                    complete
                                </button>
                            </div>
                    </div>
                    <div className='ml-4 mb-4'>
                    <h1 className='font-montserrat text-xl font-bold'>
                        Description:
                        </h1>
                        <p>
                        {task.description}
                        </p>
                    </div>
                    </div>
                </div>
            )   
            )}
        </div>
        {addt && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <h1 className="text-2xl font-bold mb-4">Add Task</h1>
                        <form onSubmit={() => handleAddTask(Project._id)} className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-semibold">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="border border-gray-300 p-2 rounded"
                                value={Tname}
                                onChange={(e) => setTname(e.target.value)}
                            />
                            <label htmlFor="des" className="font-semibold mt-2">Description:</label>
                            <input
                                type="text"
                                id="des"
                                name="des"
                                className="border border-gray-300 p-2 rounded"
                                value={Tdes}
                                onChange={(e) => setTdes(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 font-montserrat"
                                    onClick={()=>setopenaddt(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-peach text-white px-4 py-2 rounded-lg font-montserrat">
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deletepopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <h1 className="text-2xl font-bold mb-4">Do You want to Delete this task?</h1>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 font-montserrat"
                                onClick={handledeleteclose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-montserrat"
                                onClick={() => handledeletetask(taskd._id)}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  )
}

export default ProjectDetail