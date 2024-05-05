const Task = require("../../../models/Task");

const create = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newTask = new Task({
      user,
      title,
      description,
    });

    const savedTask = await newTask.save();

    return res.status(201).json({
      success: true,
      data: savedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.find({ user: userId });

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getByUserId,
};
