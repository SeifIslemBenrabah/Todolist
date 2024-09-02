const express = require('express')
const Task = require('../modules/task.model')
const Project = require('../modules/project.model')
//add
const addtask = async(req,res)=>{
    try{
        const {project} =req.body
        const task = await Task.create(req.body)
        await Project.findByIdAndUpdate(project, {
            $push: { tasks: task._id }
        });
        res.status(201).json(task)
    }
    catch(err){
        res.status(500).json({ msg: err.message });
        console.log('Project creation failed:', err.message);
    }
}
//delete 
const deletetask = async (req,res)=>{
    try{
        const {id} =req.params;
        const task = await Task.findByIdAndDelete(id)
        
        if(!task){
            return res.status(404).json({msg:'task not found'})
        }
        await Project.updateOne(
            { tasks: id },
            { $pull: { tasks: id } }
        );
        res.status(200).json({ msg: 'task deleted successfully' });
    }
    catch(err){
        res.status(500).json({msg :err.message})
    }
}
//get all task of all projects
const gettasks = async(req,res)=>{
    try{
        const {id} =req.params
        const tasks = await Task.find({user:id})
        if(tasks.length === 0){
            return res.status(404).json('0 Tasks')
        }
        res.status(200).json(tasks)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}
//get tasks of project id
const gettask = async (req,res)=>{
    try{
        const {id} =req.params
        const tasks =await Task.find({project:id})
        if(tasks.length === 0){
            return res.status(404).json('0 Tasks in this project')
        }
        res.status(200).json(tasks)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}
// Update task
const updatetask = async (req, res) => {
    try {
        const { id } = req.params; // The task ID to update
        const taskData = req.body; // The new data for the task

        // Find the task by ID and update it with the new data
        const task = await Task.findByIdAndUpdate(id, taskData, { new: true });

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Respond with the updated task
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

module.exports ={
    updatetask,
    deletetask,
    addtask,
    gettask,
    gettasks
}