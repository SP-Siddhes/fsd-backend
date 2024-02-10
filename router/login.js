const express = require("express");
const { AuthenticateUser } = require("../controller/Login");
const client = require("../redis");
const router = express.Router();

client
    .connect()
    .then(() => {
        console.log("connected to redis")
    })
    .catch((e) => {
        console.log(e);
    });



router.post("/", async (req, res) => {
    try{ const {email, password} = await req.body;
    const loginCredentials = await AuthenticateUser(email, password);
    console.log(loginCredentials);
    if (loginCredentials === "Invaild Email or Password" ){
        res.status(200).send("Invaild Email or Password")
} else if (loginCredentials === "Server Busy") {
    res.status(200).send("Server Busy")
} else {
    res.status(200).json({token :loginCredentials.token})
    
}
} catch (e)

    { console.error( "Error:", e.message);}
   

} );

module.exports = router;