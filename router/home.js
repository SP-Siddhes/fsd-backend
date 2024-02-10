const express= require("express");
const {AuthoriseUser} = require ("../controller/Login")
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const auth_token = await req.headers.authorization;

        // Assuming AuthoriseUser returns user credentials or false on failure
        const loginCredits = AuthoriseUser(auth_token);

        if (loginCredits === false) {
            // Return a 401 status code for unauthorized access
            res.status(200).send("Invalid Token");
        } else {
            // Return the user credentials in the response
            res.json(loginCredits)
            res.status(200).send("This is working")
            
        }
    } catch (e) {
        // Log the error for debugging purposes
        console.error(e);
        // Return a 500 status code for server error
        res.status(400).send("Server busy");
    }
});

module.exports = router;








