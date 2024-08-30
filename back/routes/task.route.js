const express = require('express')
const Task = require('../modules/task.model.js')
const router = express.Router()
const { updatetask, deletetask, addtask, gettask, gettasks } =require('../controllers/task.controller.js')

// Route to add
router.post('/', addtask);

// Route to get all
router.get('/user/:id' , gettasks)
// Route to get one 
router.get('/:id', gettask);
//Route to update
router.put('/:id',updatetask)
// Route to delete 
router.delete('/:id',deletetask)

module.exports = router;