const express = require('express');
const { default: mongoose } = require('mongoose');
const Course = require("../model/courses_model");
const Lesson = require("../model/lesson_model");

module.exports ={
    insertCourse : async (req ,res, next)=>{
        try{
            const result = await new Course ({
                _id :mongoose.Types.ObjectId(),
                 name: req.body.name,
                 cost: req.body.cost,
                 lessons: res.body.lessons,
                 teacherId:req.body.teacherId
             })
         
         .save()
             res.json({
                 message: "Course is inserted",
                 id: result._id,
                 name: result.name,
                 cost: result.cost,
                 lessons: result.lessons,
                 teacherId:req.body.teacherId,
                 isSuccess: true,

             })
     }catch(err){
res.json({
message: err.message,
isSuccess: false,
})
     }
},
    getAllCourse:(req, res, next)=>{
        Course.find()
        .exec()
        .then(result =>{
            res.json({
                result: result.map(result=>{
                    return {
                        _id: mongoose.Types.ObjectId(),
                        name: result.name,
                        cost: result.cost,
                        lessons: result.lessons
                    }
                })
            })
        })
    },
    getAllCoursebyId :(req, res)=>{
        const id = req.params.id;
        Course.findById(id)
        .exec()
        .then(result =>{
            res.json({
                result: result
            })
        }).catch()
    },
    insertLessonInCourse :async (req, res)=>{
        const did = req.params.did;
       try{
        const les = await new Lesson ({
            _id : mongoose.Types.ObjectId(),
             name: req.body.name,
             price: req.body.price
         }).save();
         const course = await Course.findById(did);

         course.lessons.push(les);
            await course.save();
            res.json(
            {
                message:"inserted",
                isSuccess:true,
                course:course,
                name: les.name,
                price: les.price
            });
        }
        catch(e){
            res.json({
                message: e.message,
                isSuccess: false
            })
            
        }
}
}
