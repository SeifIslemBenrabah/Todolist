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
        res.status(500).json({ msg: err.message }); // Use err.message for consistency
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
//update task 
const updatetask = async (req,res)=>{
    try{
        const {id} =req.params;
        const task = await Task.findByIdAndUpdate(id)
        if(!task){
            return res.status(404).json({msg:'task not found'})
        }
        res.status(200).json({ msg: 'task updated successfully' });
    }
    catch(err){
        res.status(500).json({msg :err.message})
    }
}
module.exports ={
    updatetask,
    deletetask,
    addtask,
    gettask,
    gettasks
}