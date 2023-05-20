const regModel = require('../Models/regModel')
const cloudinary = require("../Utils/cloudinary");
const emailSender = require("../Utils/email");
// const bcryptjs = require("bcryptjs");

exports.newReg = async (req,res)=>{
    try {
       const{name,email,phoneNumber,gender,levelOfEducation,address,stateOfOrigin,localGovernment,hobbies,age,Stack,comment,Image}=req.body
       const updateAdmin= await cloudinary.uploader.upload(
        req.files.Image.tempFilePath,{folder:"Image"},
        (err, Image) => {
          try {
            return Image;
          } catch (err) {
            return err;
          }
        }
      );

       const data ={
        name,
        email,
        phoneNumber,
        gender,
        levelOfEducation,
        address,
        stateOfOrigin,
        localGovernment,
        hobbies,
        age,
        Stack,
        comment,
        Image:{
            public_id:updateAdmin.public_id,
            url:updateAdmin.secure_url
        }
   }
       
       const newApply = new regModel(data)
       await newApply.save()

       const message = `your application to be a student of the curve has been submitted.we are reviewing your information.`
        emailSender({
            email: newApply.email,
            subject: "Welcome, New User",
            message,
        });


       function validateEmail(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(email);
    }
    const isValidEmail = validateEmail(email);
        if (isValidEmail) {
         return res.status(200).json({
            message: "User Created",
            data: newApply
         })
        } else {
            return res.status(400).json({
                message: 'Email address is invalid',
                message2: "Could not create User"
            })
        }

    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.getSingleData = async(req,res)=>{
    try{
        const newId = req.params.newId;
        const oneData = await regModel.findById(newId);
        res.status(201).json({
            message: "Single Data",
            data: oneData
        });    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
};

exports.getAll = async(req,res)=>{
    try{
        const allReg = await regModel.find();
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
exports.updateInfo = async(req,res)=>{
    try{
        const{name,email,phoneNumber,gender,levelOfEducation,address,stateOfOrigin,localGovernment,hobbies,age,Stack,comment,Image}=req.body
        const oneId = req.params.oneId;
        const singleinfo = await regModel.findById(oneId);
        const data = {
            name,
            email,
            phoneNumber,
            gender,
            levelOfEducation,
            address,
            stateOfOrigin,
            localGovernment,
            hobbies,
            age,
            Stack,
            comment,
            }
        const updatedInfo = await regModel.findByIdAndUpdate(oneId,data);

        res.status(200).json({
            status: "Successfully updated info.",
            data: updatedInfo
        });
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};

exports.deleteRec = async(req,res)=>{
    try{
        const id = req.params.id
        await regModel.findByIdAndDelete(id);

        res.status(201).json({ message: " Successfully Deleted"})
    }catch(e){
        res.status(404).json({
            message: e.message
        });
    }
};