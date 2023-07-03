const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ReachSchema = new mongoose.Schema({
    
    name : {
        type: String,
        required: [true, "name is required"],
    },
   contactEmail : {
        type: String,
        required: [true, "contactEmail is required"],
        unique:true
    },  
    Message : {
        type: String,
        required: [true, "Message is required"],
        
    },  
},{
        timestamps: true
});
const ReachModel = mongoose.model("ReachModel", ReachSchema)

module.exports = ReachModel  



  