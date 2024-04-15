//promotor model
const Promotor = require('../../../models/Promotor');
//create promotor
const createPromotor = async (req, res) => {
    let p = new Promotor();
    let name = req.body.name;
    let phoneNumber = req.body.phoneNumber;
    let location = req.body.location;
    let address = req.body.address;
    let rating = req.body.rating;
    let logo = req.body.logo;
    let website_url = req.body.website_url;
    let is_top = req.body.is_top;
    let top_filter = req.body.top_filter;
    let is_big = req.body.is_big;

    //new promotor
    p.name = name;
    p.phoneNumber = phoneNumber;
    p.location = location;
    p.address = address;
    p.rating = rating;
    p.logo = logo;
    p.website_url = website_url;
    p.is_top = is_top;
    p.top_filter = top_filter;
    p.is_big = is_big;

    await p.save();
    res.json({
        status: p.status,
        message: "promotor created successfully",
        data:[{
            name: p.name,
            phoneNumber: p.phoneNumber,
            location: p.location,
            address: p.address,
            rating: p.rating,
            logo: p.logo,
            website_url: p.website_url,
            is_top: p.is_top,
            top_filter: p.top_filter,
            is_big: p.is_big
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
// delete by id
const deletePromotorById = async (req, res) => {
    let id = req.params.id;
    let promotor = await Promotor.findByIdAndDelete(id);
    if(!promotor){
        res.json({
            status: "failed",
            message: "promotor not found",
            data: null
        });
    }else{
        res.json({
            status: "success",
            message: "promotor deleted successfully",
            data: promotor
        });
    }
}

//put request
const updatePromotorById = async (req, res) => {
    let id = req.params.id;
    let promotor = await Promotor.findById(id);
    if(!promotor){
        res.json({
            status: "failed",
            message: "promotor not found",
            data: null
        });
    }else{
        let name = req.body.name;
        let phoneNumber = req.body.phoneNumber;
        let location = req.body.location;
        let address = req.body.address;
        let rating = req.body.rating;
        let logo = req.body.logo;
        let website_url = req.body.website_url;
        let is_top = req.body.is_top;
        let top_filter = req.body.top_filter;
        let is_big = req.body.is_big;
        promotor.name = name;
        promotor.phoneNumber = phoneNumber;
        promotor.location = location;
        promotor.address = address;
        promotor.rating = rating;
        promotor.logo = logo;
        promotor.website_url = website_url;
        promotor.is_top = is_top;
        promotor.top_filter = top_filter;
        promotor.is_big = is_big;
        await promotor.save();
        res.json({
            status: "success",
            message: "promotor updated successfully",
            data: promotor
        });
    }
}

module.exports.createPromotor = createPromotor;
module.exports.getPromotors = getPromotors;
module.exports.deletePromotorById = deletePromotorById;
module.exports.updatePromotorById = updatePromotorById;