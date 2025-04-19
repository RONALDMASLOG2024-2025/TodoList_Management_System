const express = require("express");
const router = express.Router();
const Task = require("../model/Task");
const verifyFirebaseToken = require("../middleware/firebaseAuth");

router.post("/", verifyFirebaseToken, async (req, res) => {
  const { task, datetime, notes, isCompleted } = req.body;

  try {
    const newTask = new Task({
      userId: req.user.uid, // Comes from Firebase token
      task,
      datetime,
      notes,
      isCompleted,
    });

    await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Failed to create task" });
  }
});

router.get("/tasks/:userId", verifyFirebaseToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.uid !== userId) {
      return res
        .status(403)
        .json({ message: "Access denied: mismatched user." });
    }

    const tasks = await Task.find({ userId }).sort({ datetime: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
});

router.delete("/tasks/:taskId", verifyFirebaseToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
});

// UPDATE TASK (including isCompleted)
router.put("/tasks/:taskId", verifyFirebaseToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { task, datetime, notes, isCompleted } = req.body;

    // Find task to verify ownership
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure the user updating the task owns it
    if (existingTask.userId !== req.user.uid) {
      return res
        .status(403)
        .json({ message: "Access denied: You do not own this task." });
    }

    // Build the update fields dynamically
    const updatedFields = {};
    if (task !== undefined) updatedFields.task = task;
    if (datetime !== undefined) updatedFields.datetime = datetime;
    if (notes !== undefined) updatedFields.notes = notes;
    if (isCompleted !== undefined) updatedFields.isCompleted = isCompleted;

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedFields, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
});

module.exports = router;
