const express = require('express');
const User = require('../modules/user.model')
const router = express.Router();
const {loginuser} = require('../controllers/user.controller.js')

router.post('/',loginuser)
module.exports =router;