const mongoose = require('mongoose');


 const chargecode = mongoose.Schema({
     _id : mongoose.Schema.Types.ObjectId,
     code :{
        type: String,
        required: true
     
        },
    userid:{
        type: String,
        required:true
    }
 });


 module.exports =mongoose.model('Charge', chargecode);