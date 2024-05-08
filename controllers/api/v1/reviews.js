const Review = require("../../../models/Review.js");

//create a new review with promotor, rating, title, description and date 
const create = async (req, res) => {
  const { userId, promotorId, rating, title, description, date } = req.body;

  if (!rating || !title || !description || !date) {
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
      date,
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

//put request to change the review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, title, description, date } = req.body;

  if (!rating || !title || !description || !date) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }

    review.rating = rating;
    review.title = title;
    review.description = description;
    review.date = date;

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
  

module.exports = {
  create,
  getAll,
  updateReview,
  deleteReview,
};
