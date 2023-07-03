const express = require('express')
const{newReg,getSingleData,getAll,updateInfo,deleteRec}=require('../Controllers/regController')
const Router = express.Router();

Router.route("/register").post(newReg);
Router.route("/singleRec/:newId").get(getSingleData);
Router.route("/AllRec").get(getAll);
Router.route("/update/:oneId").patch(updateInfo);
Router.route("/delete/:id").delete(deleteRec);

module.exports = Router;