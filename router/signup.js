const express = require("express");
const { CheckUser } = require("../controller/Login");
const { InsertverifyUser, InsertSignupUser } = require("../controller/Signup");
var router = express.Router();
const {Sendmail} = require("../controller/SignMail");


router.get("/:token",async(req, res) => {
    
    try{
        const response = await InsertSignupUser(req.params.token);
        res.status(200).send(response)


    }catch(e){
        console.log(e);
        res.status(500).send( `<html>
        <body><p>Your registration is failed</p>
       <p>Your link got expired</p>
       </body>
       </html>`)
        
    }
    


});
router.post("/verify",async(req,res) =>{
    const {name, email, password}= await req.body;
   console.log(name, email, password);
  const registerCredentials = await CheckUser (email);
 
  
    try {
        if (registerCredentials === false){
            
             await InsertverifyUser(name, email, password);
             
             res.status(200).send(true);
            
            
        
            

        }
        else if (registerCredentials ===true){
            res.status(200).send(false);
        }else if(registerCredentials === "Server busy") {
            res.status(500).send("Server Busy");
        }
      
       
    }catch(e){ console.log("error")}


});

module.exports = router;