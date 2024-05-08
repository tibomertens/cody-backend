//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for reviews
const reviewscontroller = require("../../../controllers/api/v1/reviews");

router.post("/", reviewscontroller.create);
router.get("/", reviewscontroller.getAll);
router.put("/:id", reviewscontroller.updateReview);
router.delete("/:id", reviewscontroller.deleteReview);


module.exports = router;