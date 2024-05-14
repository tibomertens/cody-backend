//user model
const User = require("../../../models/User");
const UserRenovation = require("../../../models/UserRenovation");
const Renovation = require("../../../models/Renovation");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 12;

//create user
const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    // Save the new user
    await newUser.save();

    // Get all renovations from Renovation model
    const renovations = await Renovation.find({}, "_id title"); // Get only the IDs of renovations

    // Create default entries in UserRenovation for each renovation
    await Promise.all(
      renovations.map(async (renovation) => {
        await UserRenovation.create({
          user: newUser._id,
          renovation: renovation._id,
          renovation_title: renovation.title,
          budget: null,
          status: "Aanbevolen",
        });
      })
    );
    let token= jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

    res.json({
      message: "User created successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
        token: token,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" , success: false});
    
  }
};

//get users
const getUsers = async (req, res) => {
  let users = await User.find();
  res.json({
    status: "success",
    message: "users retrieved successfully",
    data: users,
  });
};

//get by id
const getUserById = async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (!user) {
    res.json({
      status: "failed",
      message: "user not found",
      data: null,
    });
  } else {
    res.json({
      status: "success",
      message: "user retrieved successfully",
      data: user,
    });
  }
};

//delete user by id
const deleteUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findByIdAndDelete(id);
  if (!user) {
    res.json({
      status: "failed",
      message: "user not found",
      data: null,
    });
  } else {
    res.json({
      status: "success",
      message: "user deleted successfully",
      data: user,
    });
  }
};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let password = await bcrypt.compare(req.body.password, user.password);
    if (password) {
      //create JWT token
      let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      res.json({
        status: "success",
        message: "login successful",
        data: user,
        token: token,
      });
    } else {
      res.json({
        status: "failed",
        message: "invalid password",
        data: null,
      });
    }
  } else {
    res.json({
      status: "failed",
      message: "invalid email",
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  try {
    // Hash the password if it exists in the request body
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    // Find the user by id and update
    let user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return res.json({
        status: "failed",
        message: "User not found",
        data: null,
      });
    }

    res.json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    // Check if email and password are provided in the request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        success: false,
        message: "Email and password are required",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // find user by email
    let user = await User.findOne({
      email: email
    });

    if (!user) {
      return res.json({
        status: "mislukt",
        success: false,
        message: "User niet gevonden",
        data: null,
      });
    }

    // Update the password using updateOne
    let updatedUser = await User.updateOne(
        { _id: user._id},
        {
          $set: {
            password: hashedPassword,
          },
        }
      );

    res.json({
      status: "success",
      success: true,
      message: "Password succesvol bijgewerkt",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      status: "error",
      success: false,
      message: "Internal server error",
    });
  }
};



const updateBudget =async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from URL parameter
    const budget = req.body.budget_current;

    // Find the user-specific data for the renovation
    let userBudget = await User.findOne({ _id: userId })
  .exec();

if (!userBudget) {
  return res.status(404).json({
    message: "User-specific data not found for the user",
  });
}

// Calculate new budget values
if (userBudget.budget === null) {
  userBudget.budget = 0;
}
const newBudgetCurrent = userBudget.budget_current + budget;


// Update user document
userBudget.budget_current = parseInt(newBudgetCurrent);

await userBudget.save();

// Send the updated user-specific data in the response
res.json({
  message: "User-specific data updated successfully",
  data: userBudget,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.deleteUser = deleteUser;
module.exports.login = login;
module.exports.updateUser = updateUser;
module.exports.updateBudget = updateBudget;
module.exports.updatePassword = updatePassword;
