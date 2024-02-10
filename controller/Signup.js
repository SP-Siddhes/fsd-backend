const User = require("../models/User")
const {sendmail} = require("./SignMail");
const bcrypt = require ("bcrypt");
const mongoose = require ("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const VerifyUser = require("../models/verifyUser");


dotenv.config()



async function InsertverifyUser (name, email, password){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt) ;
        const token = Generatetoken(email);

        const newUser = new VerifyUser({name: name, email: email, password: hashedPassword,token: token});
        const activationLink =`http://localhost:4000/signup/${token}`
        content = `<p>This is the email sent to me</p>
        <a href=${activationLink}> Click me</a>

        `

          await newUser.save();
         console.log("This is ok");
         sendmail(email, "Verify User", content);

         
       

    }catch (e) {
        console.error( "Error:", e.message);
    }
}
    
    
    function Generatetoken (email) {
    const token = jwt.sign({ email: email }, process.env.signup_token);
    return token;
}
      
            async function InsertSignupUser (token){
                try {
                    const Userverify = await VerifyUser.findOne({token:token});
                if(Userverify) {
                    const newUser = new User({name: Userverify.name,
                        email: Userverify.email,
                         password: Userverify.password,
                         forgot_password:{}
                    })
               
                await newUser.save();
                await Userverify.deleteOne({token : token})
        
                const content = `<p>Your registration is successful</p>`
                sendmail(newUser.email, "Registration successful", content);
                return `<p>Your registration is successful</p>` }
            
           return `<p>Your registration is failed</p>
           <p>Your link got expired</p>`
           } catch (e){ console.log("Error:",e)
           return `<html>
            <body><p>Your registration is failed</p>
           <p>Your link got expired</p>
           </body>
           </html>`}           

        
           
        }





module.exports = {InsertverifyUser, InsertSignupUser};