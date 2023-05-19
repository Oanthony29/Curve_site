const regModel = require('../Models/regModel')
const cloudinary = require("../Utils/cloudinary");
const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs");

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