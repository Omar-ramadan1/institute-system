const express = require('express');
const { default: mongoose } = require('mongoose');
 const Stage = require("../model/stage_model");
 const Auth = require('../model/auth_model');


module.exports ={
    getAllStage:(req, res, next)=>{
        Stage.find()
        .exec()
        .then(result =>{
            res.json({
                result: result.map(result=>{
                    return {
                        _id: mongoose.Types.ObjectId(),
                        stageName: result.stageName,
                    }
                })
            })
        })
    },
    getAllStagebyId :(req, res)=>{
        const id = req.params.id;
        Stage.findById(id)
        .exec()
        .then(result =>{
            res.json({
                result: result
            })
        }).catch()
    },
    insertStage : async (req ,res, next)=>{
            try{
                // Auth.findById("625f16d8183a572b18521402",function(er,docs){
                //     if(er){
                //         console.log(er)
                //     }else{
                //         console.log("Results: ",docs)
                //     }
                // });
              //  console.log(req.body.stageId);
                const result = await new Stage ({
                    _id :mongoose.Types.ObjectId(),
                    stageName: req.body.stageName,
                    groub: req.body.groub

                 })
             
             .save()
                 res.json({
                     message: "stage is inserted",
                     id: result._id,
                     stageName: result.stageName,
                     groub: result.groub,
                     isSuccess: true,

                 })
         }catch(err){
res.json({
    message: err.message,
    isSuccess: false,
})
         }
}
}
