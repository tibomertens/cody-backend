//require express
const express = require("express");
//require router
const router = express.Router();

//import controller for users
const createUser = require("../../../controllers/api/v1/users");

// import auth from middleware/auth
const auth = require("../../../middleware/auth/Auth");

router.post("/", auth.verifyApiKey, createUser.createUser);
router.get("/", auth.verifyApiKey, createUser.getUsers);
router.delete("/:id", auth.verifyApiKey, createUser.deleteUser);
router.get("/:id", auth.verifyApiKey, createUser.getUserById);
router.post("/login", auth.verifyApiKey, createUser.login);
router.post("/login/admin", auth.verifyApiKey, createUser.loginAdmin);
router.post("/sendpasswordresetmail", auth.verifyApiKey, createUser.sendPasswordResetMail);
router.patch("/update/:id", auth.verifyApiKey, createUser.updateUser);
router.patch("/budget/:id", auth.verifyApiKey, createUser.updateBudget);
router.patch("/resetpassword", auth.verifyApiKey, createUser.resetPassword);

module.exports = router;