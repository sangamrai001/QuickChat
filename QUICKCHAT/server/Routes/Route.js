
const express = require("express") ; 
const router = express.Router() ; 
const {register,login,setAvatar,getalluser} = require("../controllers/register");
router.get("/home" , (req,res)=>{
    res.send("this is home page") ; 
})

router.post("/register" ,register)
router.post("/login" ,login)
router.post("/setAvatar/:id" ,setAvatar );
router.get("/alluser/:id",getalluser)

module.exports = router;

