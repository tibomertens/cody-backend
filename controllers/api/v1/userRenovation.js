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
        const recommendedRenovations = await UserRenovation.find({ user: userId, status: 'aanbevolen' })
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

module.exports = {
    getUserRenovation,
    getRecommended,
  };
