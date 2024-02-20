//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for promotors
const createPromotor = require("../../../controllers/api/v1/promotors");
router.post("/", createPromotor.createPromotor);
router.get("/", createPromotor.getPromotors);
router.delete("/:id", createPromotor.deletePromotorById);
router.put("/:id", createPromotor.updatePromotorById);

module.exports = router;