const express = require('express')
const{newReg}=require('../Controllers/regController')
const Router = express.Router();
Router.route("/register").post(newReg);

module.exports = Router;