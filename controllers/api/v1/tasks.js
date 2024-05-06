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

const update = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, date },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { taskId } = req.params;

    await Task.findByIdAndDelete(taskId);

    return res.status(204).json({
      success: true,
      data: null,
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
  update,
  remove
};
