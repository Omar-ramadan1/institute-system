const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var assert = require('assert');
const auth = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:  {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        minlength: [11,"passworld must be at least 6 charater"],
    },
    email:{
        type: String,
        required: true,
        maxlength:[25,"must be less than 5 length"],
       // uppercase: true,
        minlength: [10,"must be more than 2 lenghth"],
        // unique: true,
        // uniqueCaseInsensitive: true
        },
        parentphone: {
            type: Number,
            required: true,
            minlength: [11,"passworld must be at least 6 charater"],
        },
        parentname: {
            type: String,
            required: true
        },
        parentjob: {
            type:String,
            required: true
        },

    password: {
        type: String,
        required: true,
        minlength: [6,"passworld must be at least 6 charater"],

    },
    budget: {
        type: Number,
    },
    stageId:
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'stage',
         //   required: true
        },
    courses : [{
            type: Object,
          //  ref:'Course'
             }],

    
   

    type: Number
});
//auth.plugin(uniqueValidator);


module.exports = mongoose.model("AUTH",auth);