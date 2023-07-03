const express = require("express")
const {reachOut,getSingleMessage, getAllMessage, deleteMessage} = require("../Controllers/Reachout")
const Router = express.Router()

Router.route("/ReachOut").post(reachOut);
Router.route("/GetSingle/:Id").get(getSingleMessage)
Router.route("/getAll").get(getAllMessage)
Router.route("/Delete/:Id").delete(deleteMessage)
module.exports = Router
