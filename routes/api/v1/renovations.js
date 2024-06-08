//require express
const express = require("express");

//create a new router
const router = express.Router();

//require the renovations controller
const renovationsController = require("../../../controllers/api/v1/renovations");

// import auth from middleware/auth
const auth = require("../../../middleware/auth/Auth");

//add the routes
router.post("/", auth.verifyApiKey, renovationsController.create);
router.get("/", auth.verifyApiKey, renovationsController.getAll);
router.get("/:id", auth.verifyApiKey, renovationsController.getById);
router.delete("/:id", auth.verifyApiKey, renovationsController.deleteById);
router.put("/:id", auth.verifyApiKey, renovationsController.updateById);
router.get("/type/:type", auth.verifyApiKey, renovationsController.getByType);
router.get("/linegraph/:id", auth.verifyApiKey, renovationsController.getCompletedRenovationsByMonth);

//export the router
module.exports = router;
