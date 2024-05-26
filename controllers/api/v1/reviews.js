const Review = require("../../../models/Review.js");

//create a new review with promotor, rating, title, description and date
const create = async (req, res) => {
  const { rating, title, description } = req.body;
  const { promotorId, userId } = req.params;

  if (!rating || !title || !description) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  try {
    const newReview = new Review({
      userId,
      promotorId,
      rating,
      title,
      description,
    });

    const savedReview = await newReview.save();

    return res.json({
      succes: "true",
      data: savedReview,
    });
  } catch (error) {
    return res.status(500).json({
      succes: "false",
      message: error.message,
    });
  }
};

//get all reviews
const getAll = async (req, res) => {
  try {
    const reviews = await Review.find({});

    return res.json({
      status: "success",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// get all review for a specific promotor
const getReviewsByPromotor = async (req, res) => {
  const { promotorId } = req.params;

  try {
    const reviews = await Review.find({ promotorId });

    return res.json({
      success: "true",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

//put request to change the review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { promotorId, userId, rating, title, description } = req.body;

  if (!rating || !title || !description) {
    return res.status(400).json({
      status: "error",
      message: "Er ontbreken verplichte velden",
    });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review niet gevonden",
      });
    }

    review.rating = rating;
    review.title = title;
    review.description = description;
    review.promotorId = promotorId;
    review.userId = userId;

    const savedReview = await review.save();

    return res.json({
      succes: "true",
      data: savedReview,
    });
  } catch (error) {
    return res.status(500).json({
      succes: "true",
      message: error.message,
    });
  }
};

//delete request to delete the review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }

    return res.json({
      succes: "true",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      succes: "false",
      message: error.message,
    });
  }
};

getReviewById = async (req, res) => {
  let id = req.params.id;
  let review = await Review.findById(id);
  if (!review) {
    res.json({
      succes: "false",
      message: "review not found",
      data: null,
    });
  } else {
    res.json({
      success: "true",
      message: "review retrieved successfully",
      data: review,
    });
  }
};

const reportReview = async (req, res) => {
  let id = req.params.id; // Extract the review ID from the request parameters

  try {
    let review = await Review.findById(id); // Find the review by its ID

    if (!review) {
      // If the review is not found, send a response indicating failure
      return res.json({
        success: false,
        message: "review not found",
        data: null,
      });
    }

    // If the review is found, update the is_reported field
    review.is_reported = true;

    // Save the updated review to the database
    await review.save();

    // Send a response indicating success
    return res.json({
      success: true,
      message: "review reported successfully",
      data: review,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({
      success: false,
      message: "An error occurred while reporting the review",
      data: null,
    });
  }
};

module.exports = {
  create,
  getAll,
  getReviewsByPromotor,
  updateReview,
  deleteReview,
  getReviewById,
  reportReview,
};
