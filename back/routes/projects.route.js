const express = require('express');
const Project = require('../modules/project.model.js'); // Correct import for the Project model
const router = express.Router();
const { addproject, getprojects , updateproject, deleteproject } = require('../controllers/project.controller.js'); // Corrected function name

// Route to add a project
router.post('/', addproject);

// Route to get all projects
router.get('/', getprojects);
//Route to update a project by id
router.put('/:id',updateproject)
// Route to delete a project by id
router.delete('/:id',deleteproject)

module.exports = router;
