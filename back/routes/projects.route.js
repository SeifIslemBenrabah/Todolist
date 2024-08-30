const express = require('express');
const Project = require('../modules/project.model.js'); // Correct import for the Project model
const router = express.Router();
const { addproject, getprojects , updateproject, deleteproject ,getproject } = require('../controllers/project.controller.js'); // Corrected function name

// Route to add a project
router.post('/', addproject);

// Route to get all projects
router.get('/user/:id' , getprojects)
// Route to get one project
router.get('/:id', getproject);
//Route to update a project by id
router.put('/:id',updateproject)
// Route to delete a project by id
router.delete('/:id',deleteproject)

module.exports = router;
