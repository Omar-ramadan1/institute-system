const mongoose = require('mongoose');


 const buycourse = mongoose.Schema({
     _id : mongoose.Schema.Types.ObjectId,
     studentId :{
        type: String,
        required: true
     
        },
        CourseId:{
        type: String,
        required:true
    }
 });


 module.exports =mongoose.model('Buycourse', buycourse);