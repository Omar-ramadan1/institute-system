const { default: mongoose } = require('mongoose');
const Lesson = require("../model/lesson_model");


module.exports ={
    insertLesson : async (req ,res, next)=>{
        try{
            const result = await new Lesson ({
                _id :mongoose.Types.ObjectId(),
                 name: req.body.name,
                 price: req.body.price
             })
         
         .save()
             res.json({
                 message: "Lesson is inserted",
                 id: result._id,
                 name: result.name,
                 price: result.price,
                 isSuccess: true,

             })
     }catch(err){
res.json({
message: err.message,
isSuccess: false,
})
     }
},

getAllLesson:(req, res, next)=>{
        Lesson.find()
        .exec()
        .then(result =>{
            res.json({
                result: result.map(result=>{
                    return {
                        _id: mongoose.Types.ObjectId(),
                        name: result.name,
                        price: result.price
                    }
                })
            })
        })
    },

    getAllLessonbyId :(req, res)=>{
        const id = req.params.id;
        Course.findById(id)
        .exec()
        .then(result =>{
            res.json({
                result: result
            })
        }).catch()
    },
     
   
}
