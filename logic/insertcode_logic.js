const { default: mongoose } = require('mongoose');
const Code = require('../model/insertcode_model');
const Auth = require('../model/auth_model');


module.exports = {
    insertCode: async (req, res, next) => {
        Code.findOne({ codee: req.body.codee }, function (err, adventure) {
            if (err) {
                console.log("erorrrrror", err)
                return res.json({ message: "eeeee", isSuccess: false });

            } else {
                console.log("adventureeee", adventure)

                if (adventure != null) {
                    // console.log("this code exsisit")
                    return res.json({ message: "this code already  exist", isSuccess: false });
                } 
                else {
                    try {
                        const result =  new Code({
                            _id: mongoose.Types.ObjectId(),
                            codee: req.body.codee,
                            price: req.body.price,
                            userid: req.body.userid,
                        })
                        .save();
                        res.json({
                            message: "code inserted successfully",
                            id: result._id,
                            codee: result.codee,
                            price: result.price,
                            userid: result.userid,
                            isSuccess: true


                        });
                    }
                    catch (er){
                        res.json({
                            message:er.message,
                            isSuccess: false,
                       });
                    }

                }

            }
        })
    },

    chargeCode: async (req, res) => {
        const user = await Code.find({ code: req.body.code });
        if (user.length < 1) {
            return res.json({ message: "this code not exist" });

        } else {
                Code.findOneAndDelete({codee: req.body.codee},function(err,docs){
                    if(err){
                        console.log(err)
                    }else{
                        Auth.findById(req.body.stageId, function (er, docs) {},
                        )

                        console.log("Deleted User : ", docs);
                        return res.json({
                message: "code is charged successfully",
                codee: user.codee,
                price: user.price,
                isSuccess: true

            })
                    }
            })
            
        }
    }
    , getAllCode: async (req, res) => {
        try {
            const result = await Code.find().populate('emp')
            res.json({
                result: result.map(result => {
                    return {
                        id: result._id,
                        name: result.name,
                        emp: result.emp
                    }
                })
            })
        } catch (err) {
            res.json(err)


        }
    },

}