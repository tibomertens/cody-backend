//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for promotors
const createPromotor = require("../../../controllers/api/v1/promotors");

// import auth from middleware/auth
const auth = require("../../../middleware/auth/Auth");

router.post("/", auth.verifyApiKey, createPromotor.createPromotor);
router.get("/", auth.verifyApiKey, createPromotor.getPromotors);
router.get("/all/:id", auth.verifyApiKey, createPromotor.getPromotorById);
router.get("/unaccepted", auth.verifyApiKey, createPromotor.getUnacceptedPromotors);
router.delete("/:id", auth.verifyApiKey, createPromotor.deletePromotorById);
router.put("/:id", auth.verifyApiKey, createPromotor.updatePromotorById);
router.patch("/accept/:id", auth.verifyApiKey, createPromotor.acceptPromotor);

module.exports = router;