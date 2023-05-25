const express = require('express');
const router = express.Router();
const{getAllCourse,insertCourse,insertLessonInCourse} = require('../logic/courses_logic');



router.post('/',insertCourse);
 router.get('/',getAllCourse);
 router.post('/:did', insertLessonInCourse)


module.exports = router;
