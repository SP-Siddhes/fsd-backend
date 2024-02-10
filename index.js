const express = require("express");
const connectDb = require("./Db");

var cors = require("cors");
const SignupRouter = require("./router/signup");
const LoginRouter = require("./router/login");
const HomeRouter = require("./router/home");

const app = express();
const port = 4000;
app.use(cors({
    origin: "*"
}));

connectDb();
app.use(express.json())



app.get("/", (req,res)=> {
    res.send("hello world");
});

app.get("/wow", (req,res)=> {
    res.send("THis is fantastic");
});

app.use("/signup", SignupRouter);
app.use("/login", LoginRouter);
app.use("/home", HomeRouter);

app.listen(port, ()=> {
console.log(`App is working on port ${port} `);
});
