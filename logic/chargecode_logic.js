const { default: mongoose } = require('mongoose');
const Chargecode = require('../model/chargecode_model');
const Auth = require('../model/auth_model');
const Code = require('../model/insertcode_model');


module.exports = {
    insertChargecode: async (req, res, next) => {
        Code.findOne({ code :{$gte:req.body.codee}}, function (err, adventure) {
            if (err) {
                console.log("erorrrrror", err)
                return res.json({ message: "eeeee", isSuccess: false });

            } else {
                var codedata={};
                console.log("req.body.code", req.body.codee)
                var codedata = {};

                console.log("adventureeeek", adventure)
                codedata =adventure
                console.log("adventureeeekkk", codedata['userid'])

                 if(adventure != null){
                    Auth.findById("6265cf139d58e61f9dcbbef8" , function (errr, doccs) {
                        if (err) {
                            console.log("erorrrrror", errr)
                            return res.json({ message: "eeeee", isSuccess: false });
                        }else{
                            console.log("docss", doccs)
                            if(doccs != undefined){
                                
                                if (adventure != null) {
                      
                                    // console.log("this code exsisit")
                                
                                   Code.findOneAndDelete({codee:req.body.codee},function(err,docs){
                                    if(err){
                                        console.log(err)
                                        return res.json({ message:err.message, isSuccess: false });
                
                                    }
                                    else
                                    {
                                          
                                       
                                        Auth.findOneAndUpdate({_id:req.body.userid },
    {$set:{budget: userdata['budget'] + codedata["price"]}},{new: true}, function (err, docs) {
                                            if (err){
                                                console.log(err)
                                            }
                                            else{
                                                console.log("Original Doc : ",req.body.userid);

                                                console.log("Original Doc : ",docs);
                                                return res.json({
                                                    message: "code is charged successfully",
                                    
                                                    isSuccess: true
                                    
                                                })
                                            }
                                        });




                                     
                                       
                                        console.log("Deleted User : ", docs);
                                    
                                    }
                           })
                                }   else{
                                    return res.json({ message: "this   code not exsist", isSuccess: false });
                                }   
       
                           }else{
                               res.json({ message: "id is nit vaild", isSuccess: false });
                               console.log("a7777a")
       
       
                           }
                            userdata = doccs;
                            console.log("userdata", userdata)
    
                            console.log("oldbudget is", userdata['budget'])
    
                          
    
                            
                        }
                    });
                }else{
      return res.json({ message: "this code is not  exist", isSuccess: false });
     }
                codedata = adventure;
                    var userdata={};
                console.log("codedata", codedata["userid"])

            }
        }
        )
    }
    ,    
}