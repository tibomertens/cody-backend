// import location model
const Location = require("../../../models/Location");

// create location
const createLocation = async (req, res) => {
  // body has value names, this is an array of locations, we will loop through the array and save each location
  let names = req.body.names;

  if (!Array.isArray(names)) {
    return res
      .status(400)
      .json({ error: "Names should be an array of strings" });
  }

  try {
    // Create an array of promises for each location save operation
    const savePromises = names.map((name) => {
      const location = new Location({ name });
      return location.save();
    });

    // Wait for all save operations to complete
    await Promise.all(savePromises);

    res
      .status(201)
      .json({ message: "All locations have been saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving locations" });
  }
};

const deleteAll = async (req, res) => {
  try {
    await Location.deleteMany({});
    res.status(200).json({ message: "All locations have been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting locations" });
  }
};

//get locations
const getLocations = async (req, res) => {
  let locations = await Location.find();
  res.json({
    status: "success",
    message: "locations retrieved successfully",
    data: locations,
  });
};

module.exports = {
  createLocation,
  getLocations,
  deleteAll,
};
