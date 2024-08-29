const express = require('express')
const Task = require('../modules/task.model')
//add
const addtask = async(req,res)=>{
    try{
        const task = await Task.create(req.body)
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
        res.status(500).json({msg :err.msg})
    }
}
//get all
