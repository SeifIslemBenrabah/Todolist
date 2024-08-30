import React,{useEffect, useState} from 'react'
import axios from 'axios'
const Tasks = () => {
    const [listTasks, setlistTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect (()=>{
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
    },[])

  return (
    <div>
      <div className='grid grid-cols-3 gap-8 mx-3 mt-5'>
        <div className='bg-white shadow-md rounded-xl px-5 pt-3 pb-7'>To Do
        {listTasks.filter(task => task.status === 'to do').map(task => (
                        <div key={task._id}>{task.name}</div>
                    ))}
        </div>
        <div className='bg-white shadow-md rounded-xl px-5 pt-3 pb-7'>On Progress
        {listTasks.filter(task => task.status === 'in progress').map(task => (
                        <div key={task._id}>{task.name}</div>
                    ))}
        </div>
        <div className='bg-white shadow-md rounded-xl px-5 pt-3 pb-7'>Done
        {listTasks.filter(task => task.status === 'complete').map(task => (
                        <div key={task._id}>{task.name}</div>
                    ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks