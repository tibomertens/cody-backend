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
            .populate('renovation', 'title description estimated_cost priority grants startup_info type') // Populate the 'renovation' field to get renovation details
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
            .populate('renovation', 'title description estimated_cost priority grants startup_info type') // Populate the 'renovation' field to get renovation details
            .exec();

        // Send the recommended renovations in the response
        res.json({
            message: 'Recommended renovations found',
            data: recommendedRenovations,
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
            .populate('renovation', 'title description estimated_cost priority grants startup_info type') // Populate the 'renovation' field to get renovation details
            .exec();

        // Send the active renovations in the response
        res.json({
            message: 'Active renovations found',
            data: activeRenovations,
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
            .populate('renovation', 'title description estimated_cost priority grants startup_info type') // Populate the 'renovation' field to get renovation details
            .exec();

        // Send the saved renovations in the response
        res.json({
            message: 'Saved renovations found',
            data: savedRenovations,
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
            .populate('renovation', 'title description estimated_cost priority grants startup_info type') // Populate the 'renovation' field to get renovation details
            .exec();

        // Send the completed renovations in the response
        res.json({
            message: 'Completed renovations found',
            data: completedRenovations,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserRenovation,
    getRecommended,
    getActive,
    getSaved,
    getCompleted,
  };
