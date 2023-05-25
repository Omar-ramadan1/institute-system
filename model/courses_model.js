const mongoose = require('mongoose');


const courses = mongoose.Schema({
    _id :mongoose.Schema.Types.ObjectId,
    name:{
         type: String,
         required: true,
 
        },
    cost:{
        type: Number, 
        required: true,

    },
    lessons: [{
        type: Object,
         }],
         teacherId:{
            type: String,
            required:true
        }

});


module.exports = mongoose.model('Course', courses);