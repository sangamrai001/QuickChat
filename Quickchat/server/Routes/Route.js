
const express = require("express") ; 
const router = express.Router() ; 
const {register} = require("../controllers/register");
router.get("/home" , (req,res)=>{
    res.send("this is home page") ; 
})

router.post("/register" ,register)

module.exports = router;

