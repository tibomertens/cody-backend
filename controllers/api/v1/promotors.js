//promotor model
const Promotor = require('../../../models/Promotor');
//create promotor
const createPromotor = async (req, res) => {
    let p = new Promotor();
    let name = req.body.name;
    let phoneNumber = req.body.phoneNumber;
    let location = req.body.location;

    //new promotor
    p.name = name;
    p.phoneNumber = phoneNumber;
    p.location = location;

    await p.save();
    res.json({
        status: p.status,
        message: "promotor created successfully",
        data:[{
            name: p.name,
            phoneNumber: p.phoneNumber,
            location: p.location,
        }]
    });
}
//get promotors
const getPromotors = async (req, res) => {
    let promotors = await Promotor.find();
    res.json({
        status: "success",
        message: "promotors retrieved successfully",
        data: promotors
    });
}

module.exports.createPromotor = createPromotor;
module.exports.getPromotors = getPromotors;