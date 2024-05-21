//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for reviews
const reviewscontroller = require("../../../controllers/api/v1/reviews");

router.post("/:promotorId/:userId", reviewscontroller.create);
router.get("/", reviewscontroller.getAll);
router.get("/:promotorId", reviewscontroller.getReviewsByPromotor);
router.put("/:id", reviewscontroller.updateReview);
router.delete("/:id", reviewscontroller.deleteReview);
router.get("/review/:id", reviewscontroller.getReviewById);


module.exports = router;