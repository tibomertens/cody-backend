//user model
const User = require('../../../models/User');
const UserRenovation = require('../../../models/UserRenovation');
const Renovation = require('../../../models/Renovation'); 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 12;

//create user
const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
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
        const renovations = await Renovation.find({}, '_id title'); // Get only the IDs of renovations

        // Create default entries in UserRenovation for each renovation
        await Promise.all(
            renovations.map(async (renovation) => {
                await UserRenovation.create({
                    user: newUser._id,
                    renovation: renovation._id,
                    renovation_title: renovation.title,
                    budget: null,
                    status: 'aanbevolen',
                });
            })
        );

        res.json({
            message: 'User created successfully',
            data: {
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
                data: null
            });
        }

        res.json({
            status: "success",
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.deleteUser = deleteUser;
module.exports.login = login;
module.exports.updateUser = updateUser;