const Auth = require('../model/auth_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const Stage = require("../model/stage_model");
const Course = require("../model/courses_model");




module.exports = {
    signup: async (req, res) => {
        const user = Auth.findOne({ email: req.body.email },function(err, adventure){
            if(err){
                console.log("erorrrrror",err)
            }else{
                console.log("Resultoooo: ",adventure);
                if(adventure != undefined){
                    console.log("this email exsisit")
                    return res.json({ message: "this email already  exist", isSuccess:false });

                }
                else{
                    bcrypt.hash(req.body.password, 10, async function (error, hash) {
                        if (error) {
                            return res.json({ message: error.message });
                        }
                        else {
                            if (req.body.type == 0) {
                                console.log(req.body.type);
                                try {
                                    const token = jwt.sign({ email: req.body.email, name: req.body.name, }, "USER");
                                    var stagename;
                                    var groub;
                                    Stage.findById(req.body.stageId, function (er, docs) {
                                        if (er) {
                                            console.log(er)
                                        } else {
                                        //    console.log("Results: ", docs['stageName']);
                                            stagename = docs['stageName'];
                                            groub = docs['groub']
                                          //  console.log("Resultsss: ", stagename);
        
                                        }
                                    });
                                   // console.log("Resultsss: ", stagename);
        
        
        
                                    const auth = await new Auth({
                                        _id: mongoose.Types.ObjectId(),
                                        name: req.body.name,
                                        email: req.body.email,
                                        phone: req.body.phone,
                                        parentphone: req.body.parentphone,
                                        parentname: req.body.parentname,
                                        password: hash,
                                        parentjob: req.body.parentjob,
                                        type: req.body.type,
                                        budget:req.body.budget,
                                        stageId: req.body.stageId,
                                        courses: req.body.courses
                                    }).save();
        
                                    res.json({
                                        message: "create user successfully",
                                        id: auth.id,
                                        name: auth.name,
                                        phone: auth.phone,
                                        parentphone: auth.parentphone,
                                        parentname: auth.parentname,
                                        email: auth.email,
                                        password: hash,
                                        type: auth.type,
                                        parentjob: auth.parentjob,
                                        budget:auth.budget,
                                        stagename: stagename,
                                        courses:auth.courses,
                                        groub: groub,
                                        token: token
                                    })
                                }
                                catch (e) {
                                    res.json({
                                        message: e.message,
                                        isSuccess: false,
                                    })
                                }
                            }
                            else {
                                try {
                                    console.log(req.body.type);
        
                                    const token = jwt.sign({ email: req.body.email, name: req.body.name, }, "ADMIN");
        
                                    var stagename;
                                    var groub;
                                    Stage.findById(req.body.stageId, function (er, docs) {
                                        if (er) {
                                            console.log(er)
                                        } else {
                                         //   console.log("Results: ", docs['stageName']);
                                            stagename = docs['stageName'];
                                            groub = docs['groub']
                                           // console.log("Resultsss: ", stagename);
        
                                        }
                                    });
                                   // console.log("Resultsss: ", stagename);
                                    const auth = await new Auth({
                                        _id: mongoose.Types.ObjectId(),
                                        name: req.body.name,
                                        email: req.body.email,
                                        phone: req.body.phone,
                                        parentphone: req.body.parentphone,
                                        parentname: req.body.parentname,
                                        password: hash,
                                        parentjob: req.body.parentjob,
                                        type: req.body.type,
                                        budget:req.body.budget,
                                        stageId: req.body.stageId,
                                        courses: req.body.courses
                                    }).save();
        
                                    res.json({
                                        message: "create admin successfully",
                                        id: auth.id,
                                        name: auth.name,
                                        phone: auth.phone,
                                        parentphone: auth.parentphone,
                                        parentname: auth.parentname,
                                        email: auth.email,
                                        password: hash,
                                        type: auth.type,
                                        parentjob: auth.parentjob,
                                        budget:auth.budget,
                                        stagename: stagename,
                                        courses:auth.courses,
                                        groub: groub,
                                        token: token
                                    })
                                }
                                catch (e) {
                                    res.json({
                                        message: "email already exsisit",
                                        isSuccess: false,
                                   })
                                }
                            }
                        }
                    }
                    )

                }

            }
        });
        if (user.length >+ 1) {
            return res.json({ message: "this email already  exist" });
        }
        
        
    },
    getUser: async (req, res, next) => {
        const user = await Auth.find();
        var stagename;
        var groub;
        var users = [];;
        console.log("Results: ", user[0]['stageId']);

        res.json({
            result: user.map(res => {
                return {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    user: user,
                    //    stagename: stagename,
                    //  groub:groub
                }
            })
        })
    },




    login: async (req, res) => {
        const user = await Auth.find({ email: req.body.email });
        if (user.length < 1) {
            return res.json({ message: "this email not exist" });

        }

        else {
            bcrypt.compare(req.body.password, user[0].password, async (erorr, result) => {
                if (erorr) {
                    return res.json({ message: "password not exist" });
                }
                if (result) {
                    if (user[0].type == 0) {
                        const token = jwt.sign({ email: user[0].email, name: user[0].name, }, "USER");
                        var stagename;
                        var groub;
                        Stage.findById(user[0].stageId, function (er, docs) {
                            if (er) {
                                console.log(er)
                            } else {
                                console.log("Results: ", docs['stageName']);
                                stagename = docs['stageName'];
                                groub = docs['groub']
                                console.log("Resultsss: ", stagename);
                                return res.json({
                                    message: "user logged in",
                                    id: user[0].id,
                                    // name: user[0].name,
                                    // type: user[0].type,
                                    // email: user[0].email,
                                    user: [
                                        user[0]



                                    ],

                                    token: token,
                                    stagename: stagename,
                                    groub: groub
                                })

                            }
                        });

                    } else {
                        const token = jwt.sign({ email: user[0].email, name: user[0].name, }, "ADMIN");
                        var stagename;
                        var groub;
                        Stage.findById(user[0].stageId, function (er, docs) {
                            if (er) {
                                console.log(er)
                            } else {
                                console.log("Results: ", docs['stageName']);
                                stagename = docs['stageName'];
                                groub = docs['groub']
                                console.log("Resultsss: ", stagename);
                                return res.json({
                                    message: "user logged in",
                                    id: user[0].id,

                                    user: [
                                        user[0]
                                    ],

                                    token: token,
                                    stagename: stagename,
                                    groub: groub
                                })

                            }
                        });

                    }
                }
            })
        }
    },
    insertCourseInAuth :async (req, res)=>{
        const did = req.params.did;
       try{
        const course = await new Course ({
            _id : mongoose.Types.ObjectId(),
             name: req.body.name,
             cost: req.body.cost
         }).save();
         const auth = await Auth.findById(did);

         auth.courses.push(course);
            await auth.save();
            res.json(
            {
                message:"inserted",
                isSuccess:true,
                    auth:auth,
                name: course.name,
                cost: course.cost
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