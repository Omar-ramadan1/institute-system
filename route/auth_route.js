const express = require('express');
const router = express.Router();
const {signup, login,getUser,insertCourseInAuth}=require('../logic/auth_logic');
// const everyauth = require('everyauth');
// const app = express.createServer();
// everyauth.helpExpress(app); 


router.post('/signup',signup);
router.post('/login',login);
router.get('/signup',getUser);
router.post('/addcourse/:did', insertCourseInAuth);




module.exports =router;