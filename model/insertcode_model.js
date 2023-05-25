const mongoose = require('mongoose');


 const code = mongoose.Schema({
     _id : mongoose.Schema.Types.ObjectId,
     codee :{
        type: String,
        required: true
     
        },
    price:{
        type:Number,
        required: true
    },
    userid:{
            type: String,
        
    }
 });


 module.exports =mongoose.model('Code', code);