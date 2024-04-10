// Require the userRenovation model
const UserRenovation = require('../../../models/UserRenovation');

// Function to get user-specific data for a renovation
const getUserRenovation = async (req, res) => {
    try {
        const userId = req.params.userId; // Get user ID from URL parameter
        const renovationId = req.params.renovationId; // Get renovation ID from URL parameter

        // Query UserRenovation to get specific data for the user and renovation
        const userRenovation = await UserRenovation.findOne({ user: userId, renovation: renovationId })
            .populate('user', 'username email') // Populate the 'user' field to get user details
            .populate('renovation', 'title description estimated_cost priority grants startup_info type impact') // Populate the 'renovation' field to get renovation details
            .exec();

        if (!userRenovation) {
            return res.status(404).json({ message: 'User-specific data not found for the user and renovation.' });
        }

        // Send the user-specific data in the response
        res.json({
            message: 'User-specific data found',
            data: userRenovation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRecommended = async (req, res) => {
    try {
        const userId = req.params.userId; // Get user ID from URL parameter

        // Query UserRenovation to get all recommended renovations for the user
        const recommendedRenovations = await UserRenovation.find({ user: userId, status: 'Aanbevolen' })
            .populate({
                path: 'renovation',
                select: 'title description estimated_cost cost impact grants startup_info type', // Specify the fields you want to include from Renovation model
            })
            .exec();

        // Extract only the populated renovation data from recommendedRenovations
        const renovationData = recommendedRenovations.map(item => item.renovation);

        // Send the recommended renovations in the response
        res.json({
            message: 'Recommended renovations found',
            data: renovationData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getActive = async (req, res) => {
    try {
        const userId = req.params.userId; // Get user ID from URL parameter

        // Query UserRenovation to get all active renovations for the user
        const activeRenovations = await UserRenovation.find({ user: userId, status: 'Actief' })
            .populate({
                path: 'renovation',
                select: 'title description estimated_cost cost impact grants startup_info type', // Specify the fields you want to include from Renovation model
            })
            .exec();

        // Extract only the populated renovation data from activeRenovations
        const renovationData = activeRenovations.map(item => item.renovation);

        // Send the active renovations in the response
        res.json({
            message: 'Active renovations found',
            data: renovationData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSaved = async (req, res) => {
    try {
        const userId = req.params.userId; // Get user ID from URL parameter

        // Query UserRenovation to get all saved renovations for the user
        const savedRenovations = await UserRenovation.find({ user: userId, saved: true })
            .populate({
                path: 'renovation',
                select: 'title description estimated_cost cost impact grants startup_info type', // Specify the fields you want to include from Renovation model
            })
            .exec();

        // Extract only the populated renovation data from savedRenovations
        const renovationData = savedRenovations.map(item => item.renovation);

        // Send the saved renovations in the response
        res.json({
            message: 'Saved renovations found',
            data: renovationData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCompleted = async (req, res) => {
    try {
        const userId = req.params.userId; // Get user ID from URL parameter

        // Query UserRenovation to get all completed renovations for the user
        const completedRenovations = await UserRenovation.find({ user: userId, status: 'Voltooid' })
            .populate({
                path: 'renovation',
                select: 'title description estimated_cost cost impact grants startup_info type', // Specify the fields you want to include from Renovation model
            })
            .exec();

        // Extract only the populated renovation data from completedRenovations
        const renovationData = completedRenovations.map(item => item.renovation);

        // Send the completed renovations in the response
        res.json({
            message: 'Completed renovations found',
            data: renovationData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateRecommendations = async (req, res) => {
    try {
        const userId = req.params.userId; // Get user ID from URL parameter
        const renovationTitle = req.params.renovationTitle; // Get renovation ID from URL parameter
        const status = req.body.status; // Get the status from the request body

        // Find the user-specific data for the renovation
        const userRenovation = await UserRenovation.findOne({ user: userId, renovation_title: renovationTitle });

        if (!userRenovation) {
            return res.status(404).json({ message: 'User-specific data not found for the user and renovation.' });
        }

        // Update the status of the user-specific data
        userRenovation.status = status;
        await userRenovation.save();

        // Send the updated user-specific data in the response
        res.json({
            message: 'User-specific recommendations updated successfully',
            data: userRenovation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getUserRenovation,
    getRecommended,
    getActive,
    getSaved,
    getCompleted,
    updateRecommendations,
  };
