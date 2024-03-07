//user model
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
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
//get by id
const getUserById = async (req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    if(!user){
        res.json({
            status: "failed",
            message: "user not found",
            data: null
        });
    }else{
        res.json({
            status: "success",
            message: "user retrieved successfully",
            data: user
        });
    }
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
const login = async (req, res) => {
    let user= await User.findOne({email: req.body.email});
    if(user){
        let password = await bcrypt.compare(req.body.password, user.password);
        if(password){
            //create JWT token
            let token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
            res.json({
                status: "success",
                message: "login successful",
                data: user,
                token: token
            });
        }else{
            res.json({
                status: "failed",
                message: "invalid password",
                data: null
            });
        }
    }
    else{
        res.json({
            status: "failed",
            message: "invalid email",
            data: null
        });
    }
    
}

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.deleteUser = deleteUser;
module.exports.login = login;