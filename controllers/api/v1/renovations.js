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
    !type
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
    });

    // Save the renovation
    const savedRenovation = await newRenovation.save();

    // Get all users
    const users = await User.find({}, '_id');

    // Create UserRenovation records for each user and the new renovation
    await Promise.all(
      users.map(async (user) => {
        await UserRenovation.create({
          user: user._id,
          renovation: savedRenovation._id,
          renovation_title: savedRenovation.title,
          budget: null,
          status: 'Aanbevolen',
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

//export the functions
module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
