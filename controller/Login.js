const express = require("express")
const User = require ("../models/User");
const bcrypt = require ("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const client = require("../redis");

dotenv.config()

async  function CheckUser (email){
    try {
        const user = await User.findOne({email:email})
        if (user) {
            return true;
        }else { return false;}

    }
    catch (e){
        return "Server busy"
    }
}

async function AuthenticateUser (email, password){
    try{
        const Usercheck = await User.findOne({email:email});
        const vaildPassword = await bcrypt.compare(password, Usercheck.password)
        if (vaildPassword) {
            const token =jwt.sign({email},process.env.login_token)
            const response = {
                id : Usercheck._id,
                name: Usercheck.name, 
                email: Usercheck.email,
                token: token,
                status: true
            }
            await client.set(`key-${email}`, JSON.stringify(response));
            await User.findOneAndUpdate({email :Usercheck.email}, {$set:{token:token}}, {new :true})
            return response
        }
        return "Invaild Email or Password"
    }
    catch (e){
        console.log("Error", e)
        return "Server Busy"
    }

}

async function AuthoriseUser(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.login_token);
       

        if (decodedToken) {
            const email = decodedToken.email;
            const auth = await client.get(`key-${email}`);

            if (auth) {
                const data = JSON.parse(auth);
                
            } else {
                const user = await User.findOne({ email: email });

                if (user) {
                    // Save user data to Redis for future use
                    await client.set(`key-${email}`, JSON.stringify(user));
                    
                } else {
                    return false;
                }
            }
        }

        return false;
    } catch (e) {
        console.error(e);
        throw new Error('Token verification failed'); // Propagate the error for better error handling
    }
}





module.exports = {CheckUser, AuthenticateUser, AuthoriseUser};