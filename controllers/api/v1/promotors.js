//promotor model
const Promotor = require("../../../models/Promotor");

//create promotor
const createPromotor = async (req, res) => {
  try {
    const {
      tier,
      name,
      email,
      website,
      phoneNumber,
      street,
      streetNumber,
      city,
      postalCode,
      logo,
      message,
    } = req.body;

    // validate if the required fields are present
    if (
      !tier ||
      !name ||
      !email ||
      !website ||
      !phoneNumber ||
      !street ||
      !streetNumber ||
      !city ||
      !postalCode ||
      !logo
    ) {
      return res.status(400).json({
        message: "Gelieve de verplichte velden in te vullen",
        success: false,
      });
    }

    let is_big;
    let is_top;
    let top_filter;
    let tier_name;

    if (tier === "1") {
      is_big = false;
      is_top = false;
      top_filter = null;
      tier_name = "Basis samenwerking";
    } else if (tier === "2") {
      is_big = true;
      is_top = false;
      top_filter = null;
      tier_name = "Gevorderde samenwerking";
    } else if (tier === "3") {
      is_big = false;
      is_top = true;
      top_filter = null;
      tier_name = "Top-positie";
    }

    const promotor = new Promotor({
      tier: tier_name,
      name,
      email,
      website_url: website,
      phoneNumber,
      location: city,
      address: `${street} ${streetNumber}, ${postalCode} ${city}`,
      logo,
      message,
      is_top,
      top_filter,
      is_big,
    });

    await promotor.save();

    res.json({
      message: "Promotor created successfully",
      data: promotor,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error, success: false });
  }
};

//get promotors
const getPromotors = async (req, res) => {
  let promotors = await Promotor.find({ is_accepted: true });
  res.json({
    status: "success",
    message: "promotors retrieved successfully",
    data: promotors,
  });
};

// delete by id
const deletePromotorById = async (req, res) => {
  let id = req.params.id;
  let promotor = await Promotor.findByIdAndDelete(id);
  if (!promotor) {
    res.json({
      success: false,
      message: "promotor not found",
      data: null,
    });
  } else {
    res.json({
      success: true,
      message: "promotor deleted successfully",
      data: promotor,
    });
  }
};

//put request
const updatePromotorById = async (req, res) => {
  let id = req.params.id;
  let promotor = await Promotor.findById(id);
  if (!promotor) {
    res.json({
      status: "failed",
      message: "promotor not found",
      data: null,
    });
  } else {
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
      data: promotor,
    });
  }
};

// get all promotors where is_accepted is false
const getUnacceptedPromotors = async (req, res) => {
  let promotors = await Promotor.find({ is_accepted: false });

  res.json({
    success: true,
    message: "promotors retrieved successfully",
    data: promotors,
  });
};

const getPromotorById = async (req, res) => {
  let id = req.params.id;

  let promotor = await Promotor.findById(id);

  if (!promotor) {
    res.json({
      success: false,
      message: "promotor not found",
      data: null,
    });
  } else {
    res.json({
      success: true,
      message: "promotor retrieved successfully",
      data: promotor,
    });
  }
};

const acceptPromotor = async (req, res) => {
  let id = req.params.id;

  let promotor = await Promotor.findById(id);

  if (!promotor) {
    res.json({
      success: false,
      message: "promotor not found",
      data: null,
    });
  }

  promotor.is_accepted = true;

  await promotor.save();

  res.json({
    success: true,
    message: "promotor accepted successfully",
    data: promotor,
  });
};

module.exports.createPromotor = createPromotor;
module.exports.getPromotors = getPromotors;
module.exports.deletePromotorById = deletePromotorById;
module.exports.updatePromotorById = updatePromotorById;
module.exports.getUnacceptedPromotors = getUnacceptedPromotors;
module.exports.getPromotorById = getPromotorById;
module.exports.acceptPromotor = acceptPromotor;
