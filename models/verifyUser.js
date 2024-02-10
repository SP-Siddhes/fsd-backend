const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema(

    {
        name : {type:"string" , required:true,},
        email : {type :"string", required : true},
        password : {type : "string", required : true},
        token : {type :"string", required:true },
        

    },
    {
        collection: "VerifyUser"
    }
)

module.exports= mongoose.model("VerifyUser", verifySchema);