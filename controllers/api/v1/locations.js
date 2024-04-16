// import location model
const Location = require('../../../models/Location');
//create location
const createLocation = async (req, res) => {
    let l = new Location();
    let name = req.body.name;
    //new location
    l.name = name;
    await l.save();
    res.json({
        status: l.status,
        message: "location created successfully",
        data:[{
            name: l.name,
        }]
    });
}
//get locations
const getLocations = async (req, res) => {
    let locations = await Location.find();
    res.json({
        status: "success",
        message: "locations retrieved successfully",
        data: locations
    });
}

module.exports = {
    createLocation,
    getLocations
}
