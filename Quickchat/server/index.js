const express = require("express") ; 
const app = express() ; 
const cors  = require("cors") ; 

app.use(express.json()) ; 
app.use(cors()) ; 

require("dotenv").config() ; 
const dbConnect = require("./config/database") ; 
dbConnect() ; 
PORT = process.env.PORT ; 
const router = require("./Routes/Route") ;
app.use("/api/v1" , router) ; 

app.get("" , (req,res)=>{
    res.send("this is first");
})
app.listen(PORT , (req,res)=>{
    console.log("app start successfully" , PORT)
})