const mongoose = require('mongoose');

const stage = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    stageName: {
        type:String, 
        required: true       
    },
    groub: {
        type:String,  
        required: true      
    },
   
    
    
});


module.exports = mongoose.model("stage",stage);


