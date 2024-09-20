const Schema1 = require("../models/Register");
const mongoose = require("mongoose") ; 
const bcrypt =require("bcrypt") ; 


exports.register =async (req,res)=>{
    try{
        const {username , email , password} = req.body ; 
        console.log(req.body);

        const checkUser = await Schema1.findOne({username}) ; 
        if(checkUser){
            return res.json({
                status: (409),
                message:"username already used",
                success:false
            })
        }
        const checkEmail = await Schema1.findOne({email}) ; 
        if(checkEmail){
            return res.json({
                status: (409),
                message:"email already used",
                success:false
            })
        }
        const hashed = await bcrypt.hash(password , 10) ; 

    const obj = new Schema1({username , email ,password:hashed}) ; 
    const data = await obj.save() ;
    delete data.password;
    return res.status(200).json({
        success:true,
        message:data
    })
    }
    catch(err){
        console.log(err) ;
    }
     

}