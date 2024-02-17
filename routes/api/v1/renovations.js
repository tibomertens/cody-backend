//require express
const express = require("express");

//create a new router
const router = express.Router();

//require the renovations controller
const renovationsController = require("../../../controllers/api/v1/renovations");

//add the routes
router.post("/", renovationsController.create);
router.get("/", renovationsController.getAll);
router.get("/:id", renovationsController.getById);

//export the router
module.exports = router;