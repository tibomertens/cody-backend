//user model
const User = require("../../../models/User");
const UserRenovation = require("../../../models/UserRenovation");
const Renovation = require("../../../models/Renovation");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const salt = 12;

//create user
const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Er bestaat al een gebruiker met deze email" });
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

const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;

    // Find the user to be deleted
    let user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.json({
        status: "failed",
        message: "User not found",
        data: null,
      });
    }

    // Delete associated userRenovations
    await UserRenovation.deleteMany({ user: user._id });

    return res.json({
      status: "success",
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    let password = await bcrypt.compare(req.body.password, user.password);

    if (password) {
      //create JWT token
      let token = jwt.sign(
        { id: user._id, admin: false },
        process.env.SECRET_KEY
      );

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

const loginAdmin = async (req, res) => {
  // check if email & password are filled in
  if (!req.body.email || !req.body.password) {
    return res.json({
      status: "failed",
      message: "Vul een email en wachtwoord in",
      data: null,
    });
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    let password = await bcrypt.compare(req.body.password, user.password);

    if (password) {
      // Check if the user is an admin
      if (!user.admin) {
        return res.json({
          success: false,
          message: "Je bent geen admin",
          data: null,
        });
      }

      //create JWT token
      let token = jwt.sign(
        { id: user._id, admin: true },
        process.env.SECRET_KEY
      );

      res.json({
        success: true,
        message: "login successful",
        data: user,
        token: token,
      });
    } else {
      res.json({
        success: false,
        message: "Incorrect wachtwoord",
        data: null,
      });
    }
  } else {
    res.json({
      success: false,
      message: "Incorrect email",
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findOne({ _id: id });

    if (!user) {
      return res.json({
        status: "failed",
        message: "User not found",
        data: null,
      });
    }

    // If the request body contains a password
    if (req.body.password) {
      // Check if the oldPassword is provided in the request body
      if (!req.body.old_password) {
        return res.status(400).json({
          status: "failed",
          message: "Old password is required",
        });
      }

      // Compare the old password provided with the existing password
      const isMatch = await bcrypt.compare(req.body.old_password, user.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: "Oud wachtwoord is onjuist",
        });
      }
      // Hash the new password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    // Find the user by id and update with the new data
    user = await User.findByIdAndUpdate(id, req.body, { new: true });

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

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordResetMail = async (req, res) => {
  try {
    // Check if email is provided in the request body
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "error",
        success: false,
        message: "Email is required",
      });
    }

    // Find user by email
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        status: "mislukt",
        success: false,
        message: "User niet gevonden",
        data: null,
      });
    }

    // Generate a password reset token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // URL to reset the password (change `yourfrontend.com` to your actual frontend URL)
    const resetUrl = `${process.env.APP_URL}/resetpassword?token=${token}`;

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Wachtwoord reset link',
      text: `Je hebt aangevraagd uw wachtwoord te veranderen, u kunt deze veranderen op volgende url: ${resetUrl}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          status: "error",
          success: false,
          message: "Error sending email",
        });
      }
      res.json({
        status: "success",
        success: true,
        message: "Password reset link has been sent to your email.",
      });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      status: "error",
      success: false,
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Get the token from the request body
    const token = req.body.token;

    // Check if token is provided
    if (!token) {
      return res.status(400).json({
        status: "error",
        success: false,
        message: "Je hebt geen token opgegeven om je wachtwoord te resetten",
      });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "error",
          success: false,
          message: "Je token is ongeldig of verlopen",
        });
      }

      // Find the user by id
      let user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          status: "error",
          success: false,
          message: "User niet gevonden",
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      res.json({
        status: "success",
        success: true,
        message: "Password reset successfully",
      });
    });
  } catch (error) {
    console.error("Error processing request:", error);
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
module.exports.loginAdmin = loginAdmin;
module.exports.updateBudget = updateBudget;
module.exports.sendPasswordResetMail = sendPasswordResetMail;
module.exports.resetPassword = resetPassword;
