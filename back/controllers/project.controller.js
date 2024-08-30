const express = require('express');
const Project = require('../modules/project.model.js');
const Task = require('../modules/task.model.js')
// Function to add a project
const addproject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project); // 201 Created is more appropriate for successful creation
        console.log('Project created:', req.body);
    } catch (err) {
        res.status(500).json({ msg: err.message }); // Use err.message for consistency
        console.log('Project creation failed:', err.message);
    }
};

// Function to get all projects
const getprojects = async (req, res) => {
    try {
        const {id} = req.params
        const projects = await Project.find({user:id});
        if (projects.length === 0) {
            return res.status(404).json({ msg: 'No projects found' });
        }
        res.status(200).json({ msg: 'Projects retrieved successfully', projects });
    } catch (err) {
        res.status(500).json({ msg: err.message });
        console.log('Failed to retrieve projects:', err.message);
    }
};
// get one project by id 
const getproject = async (req,res) =>{
    try{
        const {id} =req.params
        const project = await Project.findById(id)
        if (!project){
            return res.status(404).json({msg:'project not found'})
        }
        res.status(200).json(project)
    }
    catch(err){
        res.status(500).json(err)
    }
}
const updateproject = async (req,res)=> {
    try{
        const {id} =req.params
        const project = await Project.findByIdAndUpdate(id, req.body)
        if (!project){
            return res.status(404).json({msg:'project not found'})
        }
        const updatedproject = await Project.findById(id)
        res.status(200).json(updatedproject)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
};
// delete
const deleteproject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
           // Delete all tasks associated with the project
           console.log('Tasks to delete:', project.tasks);
        await Task.deleteMany({ _id: { $in: project.tasks } });

        // Delete the project
        await Project.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
        console.log('Failed to delete project:', err.message);
    }
};
module.exports = {
    addproject,
    getprojects,
    updateproject,
    deleteproject,
    getproject
};
