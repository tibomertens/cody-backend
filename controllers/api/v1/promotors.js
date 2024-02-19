//promotor model
const Promotor = require('../../../models/Promotor');
//create promotor
const createPromotor = async (req, res) => {
    let p = new Promotor();
    let name = req.body.name;
    let phonenumber = req.body.phonenumber;
    let location = req.body.location;

    //new promotor
    p.name = name;
    p.phonenumber = phonenumber;
    p.location = location;

    await p.save();
    res.json({
        status: p.status,
        message: "promotor created successfully",
        data:[{
            name: p.name,
            phonenumber: p.phonenumber,
            location: p.location,
        }]
    });
}

module.exports.createPromotor = createPromotor;