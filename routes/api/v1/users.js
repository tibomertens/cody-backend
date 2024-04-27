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
router.post("/login/admin", createUser.loginAdmin);
router.patch("/:id", createUser.updateUser);

module.exports = router;