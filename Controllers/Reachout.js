const ReachOut = require("../Models/Reachout")
const dotenv = require("dotenv")

exports.reachOut = async(req, res) => {
    try {
        const {name, contactEmail, Message} = req.body
        const reach = {
            name,
            contactEmail,
            Message
        }
        const reaching = await ReachOut.create(reach)
        res.status(201).json({
            message : "Successfully Reached Out",
            data: reaching
        })
    } catch (e) { 
        res.status(400).json({
            message: e.message
        })
    }    
};

// getAllReachOut
exports.getSingleMessage = async(req,res)=>{
    try{
        const newMessage = req.params.Id;
        const oneMessage = await ReachOut.findById(newMessage);
        res.status(201).json({
            message: "Single Message",
            data: oneMessage
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.getAllMessage = async(req,res)=>{
    try{
        const allReg = await ReachOut.find();
        res.status(201).json({
            message: "All Admin",
            length: allReg.length,
            data: allReg
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

// deleteMessage
exports.deleteMessage = async(req,res)=>{
    try{
        const Id = req.params.Id
        const deleted = await ReachOut.findByIdAndDelete(Id);
        console.log(deleted)
        res.status(201).json({
             message: " Successfully new  Deleted" ,
            data:deleted
            })
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
}; 
 
