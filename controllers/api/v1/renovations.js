//require the renovations model
const Renovation = require("../../../models/Renovation");

//create a new renovation
const create = async (req, res) => {
  //get title, description, estimated_cost, priority, grants, startup_info from the request body
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

  let renovation = new Renovation({
    title,
    description,
    estimated_cost,
    priority,
    grants,
    startup_info,
  });

  try {
    //save the renovation
    let savedRenovation = await renovation.save();
    res.status(201).json({
      status: "success",
      message: "Renovation created",
      data: savedRenovation,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  create,
};
