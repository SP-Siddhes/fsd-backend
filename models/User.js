const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(

    {
        name : {type:"string" },
        email : {type :"string", required : true},
        password : {type : "string", },
        JoinedOn : {type:Date, default:Date.now() },
    
        forgot_password : {time: Date, otp: "string"},
        token : {type :"string",  },
        

    },
    {
        collection: "User"
    }
)

module.exports= mongoose.model("User", UserSchema);