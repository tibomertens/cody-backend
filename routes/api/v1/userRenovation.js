//require express
const express = require("express");

//create a new router
const router = express.Router();

//require the renovations controller
const userRenovation = require("../../../controllers/api/v1/userRenovation");

// import auth from middleware/auth
const auth = require("../../../middleware/auth/Auth");

//add the routes
router.get("/users/:userId/renovations/:renovationId", auth.verifyApiKey, userRenovation.getUserRenovation);
router.get("/users/:userId/recommended", auth.verifyApiKey, userRenovation.getRecommended);
router.get("/users/:userId/active", auth.verifyApiKey, userRenovation.getActive);
router.get("/users/:userId/saved", auth.verifyApiKey, userRenovation.getSaved);
router.get("/users/:userId/completed", userRenovation.getCompleted);
router.get("/users/:userId/renovations",, auth.verifyApiKey, userRenovation.getAll);
router.patch("/users/:userId/renovations/:renovationTitle", auth.verifyApiKey, userRenovation.updateRecommendations);
router.patch("/users/:userId/renovations/:renovationId/updateState", auth.verifyApiKey, userRenovation.updateState);
router.patch("/users/:userId/renovations/:renovationId/updateAmount", auth.verifyApiKey, userRenovation.updateAmount);
router.patch("/users/:userId/renovations/:renovationId/updateUserData", auth.verifyApiKey, userRenovation.updateUserData);
router.patch("/users/:userId/renovations/:renovationId/updateSaved", auth.verifyApiKey, userRenovation.updateSaved);
router.patch("/users/:userId/renovations/:renovationId/updateNotes", auth.verifyApiKey, userRenovation.updateNotes);
router.patch("/users/:userId/renovations/:renovationId/updateChecklist", auth.verifyApiKey, userRenovation.updateChecklist);

//export the router
module.exports = router;