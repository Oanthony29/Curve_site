const mongoose = require("mongoose");
const Schema = mongoose.Schema

const regSchema = new mongoose.Schema({
    
    name : {
        type: String,
        required: [true, "name is required"],
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        unique:true
    },
    phoneNumber : {
        type: String
    },
    gender : {
        type: String
    },
    levelOfEducation : {
        type: String
    },
    address : {
        type: String
    },
    stateOfOrigin : {
        type: String
    },
    localGovernment : {
        type: String
    },
    hobbies : {
        type: String
    },
    age : {
        type: String 
    },
    Stack : {
        type: String
    },
    comment : {
        type: String
    },
    Image:{
        public_id: {
            type: String,
        },
        url:{ 
            type: String,
        }
    },
},{
        timestamps: true
});
const regModel = mongoose.model("resgister", regSchema)

module.exports = regModel

  