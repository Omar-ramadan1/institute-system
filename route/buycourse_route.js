const express = require('express');
const router = express.Router();
const {buycourse,}=require('../logic/buycourse_logic');



router.post('/',buycourse);





module.exports =router;