//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for promotors
const taskscontroller = require("../../../controllers/api/v1/tasks");

router.post("/", taskscontroller.create);
router.get("/", taskscontroller.getAll);

module.exports = router;