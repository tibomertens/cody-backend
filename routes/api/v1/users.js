//require express
const express = require("express");
//require router
const router = express.Router();

//import controller for users
const createUser = require("../../../controllers/api/v1/users");

router.post("/", createUser.createUser);
router.get("/", createUser.getUsers);
router.delete("/:id", createUser.deleteUser);
router.get("/:id", createUser.getUserById);
router.post("/login", createUser.login);
router.patch("/update/:id", createUser.updateUser);
router.patch("/budget/:id", createUser.updateBudget);
router.patch("/updatepassword", createUser.updatePassword);

module.exports = router;