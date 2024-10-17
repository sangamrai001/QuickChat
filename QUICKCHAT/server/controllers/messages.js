
const messmodel = require("../models/Messagemodel");
module.exports.addmess= async(req,res,nxt) => {
    try{
        const {from,to,message} = req.body ; 
        console.log(message) ; 
        
        const data = await messmodel.create({
            message:{
                text:message,
            },
            users:[from,to],
            sender:from,
        });
        if(data)return res.status(200).json({
            msg:"message added successfully",
            success:true,
        })
        return res.status(500).json({
            msg:"failed to add message to the database"
            ,
            success:false,
        })
    }
    catch(err){
        console.log(err);
        nxt(err)
    }
};

module.exports.getmess = async (req, res, nxt) => {
  try {
    const { from, to } = req.query; 
    const messages = await messmodel
      .find({ users: { $all: [from, to] } })
      .sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    }));

    return res.status(200).json(projectedMessages);
  } catch (err) {
    console.log(err);
    nxt(err);
  }
};

