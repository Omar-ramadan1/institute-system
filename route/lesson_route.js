const express = require('express');
const router = express.Router();
const{insertLesson,getAllLesson} = require('../logic/lesson_logic');



router.post('/',insertLesson);
 router.get('/',getAllLesson);


module.exports = router;
