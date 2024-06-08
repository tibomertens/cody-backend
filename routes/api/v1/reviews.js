//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for reviews
const reviewscontroller = require("../../../controllers/api/v1/reviews");

// import auth from middleware/auth
const auth = require("../../../middleware/auth/Auth");

router.post("/:promotorId/:userId", auth.verifyApiKey, reviewscontroller.create);
router.get("/", auth.verifyApiKey, reviewscontroller.getAll);
router.get("/:promotorId", auth.verifyApiKey, reviewscontroller.getReviewsByPromotor);
router.put("/:id", auth.verifyApiKey, reviewscontroller.updateReview);
router.delete("/:id", auth.verifyApiKey, reviewscontroller.deleteReview);
router.get("/review/:id", auth.verifyApiKey, reviewscontroller.getReviewById);
router.patch("/report/:id", auth.verifyApiKey, reviewscontroller.reportReview);
router.get("/reported/all", auth.verifyApiKey, reviewscontroller.getReportedReviews);

module.exports = router;
