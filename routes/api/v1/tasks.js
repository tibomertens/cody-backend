//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for promotors
const taskscontroller = require("../../../controllers/api/v1/tasks");

// import auth from middleware/auth
const auth = require("../../../middleware/auth/Auth");

router.post("/", auth.verifyApiKey, taskscontroller.create);
router.get("/", auth.verifyApiKey, taskscontroller.getAll);
router.get("/:userId", auth.verifyApiKey, taskscontroller.getByUserId);
router.put("/:taskId", auth.verifyApiKey, taskscontroller.update);
router.delete("/:taskId", auth.verifyApiKey, taskscontroller.remove);

module.exports = router;