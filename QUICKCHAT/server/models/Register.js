const mongoose = require("mongoose") ; 

const newSc = new mongoose.Schema({
    username:{
        type:String,
        required:true , 
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isavaImage:{
        type:Boolean,
        default:false
    },
    avaImage:{
        type:String,
        default: ""
    }

})
module.exports = mongoose.model("Schema" , newSc) ; 