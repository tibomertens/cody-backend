//user model
const User = require('../../../models/User');
const bcrypt = require('bcrypt');
const salt = 12;
//create user
const createUser = async (req, res) => {
    let u = new User();
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let admin = req.body.admin;

    //new user
    u.username = username;
    u.password = password;
    u.email = email;
    u.admin = admin;

    //hash password
    u.password = await bcrypt.hash(password, salt);
   

    await u.save();
    res.json({
        status: u.status,
        message: "user created successfully",
        data:[{
            username: u.username,
            password: u.password,
            email: u.email,
            admin: u.admin,
        }]
    });
}
//get users
const getUsers = async (req, res) => {
    let users = await User.find();
    res.json({
        status: "success",
        message: "users retrieved successfully",
        data: users
    });
}
//delete user by id
const deleteUser = async (req, res) => {
    let id = req.params.id;
    let user = await User.findByIdAndDelete(id);
    if(!user){ 
        res.json({
            status: "failed",
            message: "user not found",
            data: null
        });
    }else{
        res.json({
            status: "success",
            message: "user deleted successfully",
            data: user
        });
    }
    
}


module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;