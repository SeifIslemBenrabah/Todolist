import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
    const [listprojects, setlistprojects] = useState([]);
    const [aproject, setproject] = useState('');
    const [des, setdes] = useState('');
    const [open, setOpen] = useState(false);
    const [openupdate,setopenupdate] =useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    const [deletepopup, setdeletepopup] = useState(false);
    const [project, setprojectd] = useState({});

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:8080/project');
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
    }, []);

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/project', {
                name: aproject,
                description: des,
                user: user.id
            });
            setOpen(false); // Close the modal after adding the project
            setproject('');
            setdes('');
            // Fetch the updated list of projects
            const res = await axios.get('http://localhost:8080/project');
            setlistprojects(res.data.projects);
        } catch (error) {
            console.log('Error in adding project', error);
        }
    };
    const handleupdateProject = async (id) => {
        try {
            await axios.put(`http://localhost:8080/project/${id}`, {
                name: aproject,
                description: des,
                user: user.id
            });
            setopenupdate(false); // Close the modal after adding the project
            setproject('');
            setdes('');
            // Fetch the updated list of projects
            const res = await axios.get('http://localhost:8080/project');
            setlistprojects(res.data.projects);
        } catch (error) {
            console.log('Error in adding project', error);
        }
    };
    const handledeletproject = async (_id) => {
        try {
            await axios.delete(`http://localhost:8080/project/${_id}`);
            setdeletepopup(false);
            setprojectd({});
            console.log('Project deleted');
            // Update the list of projects after deletion
            setlistprojects((prevProjects) => prevProjects.filter((p) => p._id !== _id));
        } catch (err) {
            console.log('Error deleting project:', err);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOedit = (project) => {
        setopenupdate(true)
        setprojectd(project)
        setproject(project.name);
        setdes(project.description);
    }
    const handleClickCedit = () =>{
        setopenupdate(false)
        setproject('');
        setdes('');
    }
    const handledeletOpen = (project) => {
        setdeletepopup(true);
        setprojectd(project);
    };

    const handledeletClose = () => {
        setdeletepopup(false);
        setprojectd({})
    };

    return (
        <div className="container mx-auto p-4">
            <button
                className="bg-peach font-montserrat text-white px-4 py-2 rounded-lg flex flex-row gap-2 shadow-xl"
                onClick={handleClickOpen}
            >
                Add Project
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <div className="grid grid-cols-1 gap-3 mt-8">
                {listprojects.length > 0 ? (
                    listprojects.map((project) => (
                        <div key={project.id} className='flex flex-row border border-secondary rounded-xl p-4 justify-between'>
                            <div className="flex flex-col">
                                <h1 className='font-montserrat text-2xl font-bold'>{project.name}</h1>
                                <p className='font-montserrat'>{project.description}</p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <button className='bg-red-200 rounded-full p-4' onClick={() => handledeletOpen(project)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <button className='bg-orange-200 rounded-full p-4' onClick={() => handleClickOedit(project)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-yellow-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects available</p>
                )}
            </div>
            {open && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <h1 className="text-2xl font-bold mb-4">Add Project</h1>
                        <form onSubmit={handleAddProject} className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-semibold">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="border border-gray-300 p-2 rounded"
                                value={aproject}
                                onChange={(e) => setproject(e.target.value)}
                            />
                            <label htmlFor="des" className="font-semibold mt-2">Description:</label>
                            <input
                                type="text"
                                id="des"
                                name="des"
                                className="border border-gray-300 p-2 rounded"
                                value={des}
                                onChange={(e) => setdes(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 font-montserrat"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-peach text-white px-4 py-2 rounded-lg font-montserrat">
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deletepopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <h1 className="text-2xl font-bold mb-4">Do You want to Delete {project.name}?</h1>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 font-montserrat"
                                onClick={handledeletClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-montserrat"
                                onClick={() => handledeletproject(project._id)}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {openupdate && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3">
                        <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
                        <form onSubmit={() => handleupdateProject(project._id)} className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-semibold">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="border border-gray-300 p-2 rounded"
                                value={aproject}
                                onChange={(e) => setproject(e.target.value)}
                            />
                            <label htmlFor="des" className="font-semibold mt-2">Description:</label>
                            <input
                                type="text"
                                id="des"
                                name="des"
                                className="border border-gray-300 p-2 rounded"
                                value={des}
                                onChange={(e) => setdes(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 font-montserrat"
                                    onClick={handleClickCedit}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-peach text-white px-4 py-2 rounded-lg font-montserrat">
                                    Edit Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Projects;
