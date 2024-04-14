//require express
const express = require("express");

//create a new router
const router = express.Router();

//require the renovations controller
const userRenovation = require("../../../controllers/api/v1/userRenovation");

//add the routes
router.get("/users/:userId/renovations/:renovationId", userRenovation.getUserRenovation);
router.get("/users/:userId/recommended", userRenovation.getRecommended);
router.get("/users/:userId/active", userRenovation.getActive);
router.get("/users/:userId/saved", userRenovation.getSaved);
router.get("/users/:userId/completed", userRenovation.getCompleted);
router.patch("/users/:userId/renovations/:renovationTitle", userRenovation.updateRecommendations);
router.patch("/users/:userId/renovations/:renovationId/updateState", userRenovation.updateState);
router.patch("/users/:userId/renovations/:renovationId/updateAmount", userRenovation.updateAmount);
router.patch("/users/:userId/renovations/:renovationId/updateUserData", userRenovation.updateUserData);
router.patch("/users/:userId/renovations/:renovationId/updateSaved", userRenovation.updateSaved);
router.patch("/users/:userId/renovations/:renovationId/updateNotes", userRenovation.updateNotes);
router.patch("/users/:userId/renovations/:renovationId/updateChecklist", userRenovation.updateChecklist);

//export the router
module.exports = router;