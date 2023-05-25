const res = require('express/lib/response');
const mongoose = require('mongoose');
const Course = require('../model/courses_model');
const Auth = require("../model/auth_model");


module.exports ={
 
    buycourse :async (req, res)=>{
           const auth = await  Auth.findById(req.body.studentId);
                            
        Auth.findById(req.body.studentId, function (er, docs) {
            if (er) {
                console.log(er)
                console.log("errr: ", er);
                res.json({
                    message:"studentId is not valid",
                
                })

            } else {
                console.log("Results: ", docs);
                var studentdata ={};
                studentdata =docs
                console.log("Results: ", studentdata['budget']);
                Course.findById(req.body.CourseId,function(err, doc){
                    if(err){
                        console.log(er)
                        console.log("errr: ", er);
                        res.json({
                            message:"Courseid is not valid",
                        
                        })
                        
                    }else{
                        console.log("Results: ", doc);
                        var coursedata ={};
                        coursedata =doc
                        console.log("cost: ",coursedata['cost']);

                        if(studentdata['budget'] >= coursedata['cost']){
                            auth.courses.push(coursedata);
                            auth.save();
                            Auth.findOneAndUpdate({_id:req.body.studentId}, 
        {$set:{budget: studentdata['budget'] - coursedata['cost']}}, {new: true}, function (err, docsss) {
                                if (err){
                                    console.log(err)
                                    res.json({
                                        message:"studentid is not valied",
                                        issucess:false
                                   
                                    })
                                }
                                else{
                                    console.log("Original Doccc : ",docsss);
                                    res.json({
                                        message:"congrateulation you bought th course",
                                        issucess:true
                                   
                                    })
                                }
                            });

                            // res.json({
                            //     message:"u can buy the course",
                            //     issucess:true
                           
                            // })
                        }else {
                            res.json({
                                message:"u can't buy the course your budget isn't enough",
                                issucess:false

                           
                            })
                        }
                       

                    }
                })

                
               

            }
        });
    }
}