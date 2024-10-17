const mongoose = require('mongoose') ; 
const Schema = require("../models/Register");

const messageSchema = new mongoose.Schema({
    message:{text:{
        type:String, 
        required:true,
}

    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Schema'
    },
    
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Message" , messageSchema) ; 