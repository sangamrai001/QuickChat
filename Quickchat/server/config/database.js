
const mongoose = require("mongoose") ; 

require('dotenv').config() ; 
const URL = process.env.DATABASE_URL || 5000 ; 
const dbConnect = ()=>{
    mongoose.connect(URL)
    .then(()=>{
        console.log("db connection is successful") ; 
    }).catch((error)=>{
        
        console.log("this is the problem in db connection- "); 
        console.error(error) ; 
    })
}
module.exports = dbConnect ; 