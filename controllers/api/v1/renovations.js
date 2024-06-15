const mongoose = require("mongoose");

//require the renovations model
const Renovation = require("../../../models/Renovation");

//require the user model
const User = require("../../../models/User");

//require the userRenovation model
const UserRenovation = require("../../../models/UserRenovation");

//create a new renovation
const create = async (req, res) => {
  // Get renovation details from the request body
  const {
    title,
    description,
    estimated_cost,
    cost,
    impact,
    grants,
    startup_info,
    type,
    highest_cost,
  } = req.body;

  // Input validation
  if (
    !title ||
    !description ||
    !estimated_cost ||
    !cost ||
    !impact ||
    !grants ||
    !startup_info ||
    !type ||
    !highest_cost
  ) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields",
    });
  }

  try {
    // Create the renovation
    const newRenovation = new Renovation({
      title,
      description,
      estimated_cost,
      cost,
      impact,
      grants,
      startup_info,
      type,
      highest_cost,
    });

    // Save the renovation
    const savedRenovation = await newRenovation.save();

    // Get all users
    const users = await User.find({}, "_id");

    // Create UserRenovation records for each user and the new renovation
    await Promise.all(
      users.map(async (user) => {
        await UserRenovation.create({
          user: user._id,
          renovation: savedRenovation._id,
          renovation_title: savedRenovation.title,
          budget: null,
          status: "Aanbevolen",
        });
      })
    );

    res.status(201).json({
      status: "success",
      message: "Renovation created",
      data: savedRenovation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

//get all renovations
const getAll = async (req, res) => {
  try {
    //get all renovations
    let renovations = await Renovation.find();
    res.status(200).json({
      status: "success",
      message: "Retrieved all renovations",
      data: renovations,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

//get a single renovation by id
const getById = async (req, res) => {
  try {
    //get the id from the request params
    let id = req.params.id;
    //get the renovation
    let renovation = await Renovation.findById(id);
    //if renovation is not found, throw an error renovation not found
    if (!renovation) {
      return res.status(404).json({
        status: "error",
        message: "Renovation not found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Retrieved renovation",
        data: renovation,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

//delete a single renovation by id
const deleteById = async (req, res) => {
  try {
    //get the id from the request params
    let id = req.params.id;
    //delete the renovation
    let renovation = await Renovation.findByIdAndDelete(id);
    //if renovation is not found, throw an error renovation not found
    if (!renovation) {
      return res.status(404).json({
        status: "error",
        message: "Renovation not found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Deleted renovation",
        data: renovation,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

//add update function
const updateById = async (req, res) => {
  try {
    //get the id from the request params
    let id = req.params.id;
    //get the title, description, estimated_cost, priority, grants, startup_info from the request body
    let { title, description, estimated_cost, priority, grants, startup_info } =
      req.body;

    // Input validation
    if (
      !title ||
      !description ||
      !estimated_cost ||
      !priority ||
      !grants ||
      !startup_info
    ) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    //find the renovation by id and update
    let renovation = await Renovation.findByIdAndUpdate(
      id,
      {
        title,
        description,
        estimated_cost,
        priority,
        grants,
        startup_info,
      },
      { new: true }
    );
    //if renovation is not found, throw an error renovation not found
    if (!renovation) {
      return res.status(404).json({
        status: "error",
        message: "Renovation not found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Updated renovation",
        data: renovation,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getByType = async (req, res) => {
  try {
    // Get the type from the request params
    let type = req.params.type;

    // Get all renovations of the specified type
    let renovations = await Renovation.find({ type: type });

    // If no renovations are found, return a 404 error
    if (!renovations || renovations.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Renovations not found for the specified type",
      });
    } else {
      // If renovations are found, return them
      return res.status(200).json({
        status: "success",
        message: "Retrieved renovations",
        data: renovations,
      });
    }
  } catch (error) {
    // If there's any error, return a 500 error
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getCompletedRenovationsByMonth = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    // Step 2: Query the database for completed renovations of the user
    const completedRenovations = await UserRenovation.find({
      userId: userId,
      status: "Voltooid",
    });
    if (!completedRenovations) {
      return res
        .status(404)
        .json({ error: "User niet gevonden", success: false });
    }

    console.log(completedRenovations);

    // Step 3: Group renovations by month and count them
    const renovationsByMonth = {};

    console.log(renovationsByMonth);

    completedRenovations.forEach((renovation) => {
      const endDate = new Date(renovation.endDate);
      const month = ("0" + (endDate.getMonth() + 1)).slice(-2); // Get month and pad with leading zero
      const year = endDate.getFullYear();
      const monthYear = `${month}/${year}`;

      if (!renovationsByMonth[monthYear]) {
        renovationsByMonth[monthYear] = 0;
      }
      renovationsByMonth[monthYear]++;
    });

    console.log(renovationsByMonth);
    // Step 4: Return the results
    res.status(200).json({
      success: true,
      data: renovationsByMonth,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Er liep iets mis bij het ophalen van de renovaties.",
        success: false,
      });
  }
};

//export the functions
module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
  getByType,
  getCompletedRenovationsByMonth,
};
