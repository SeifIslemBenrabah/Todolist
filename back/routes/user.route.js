const express = require('express');
const User = require('../modules/user.model')
const router = express.Router();
const {creatuser} = require('../controllers/user.controller.js')

router.post('/',creatuser)
module.exports =router;