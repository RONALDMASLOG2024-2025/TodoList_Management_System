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

  router.delete("/tasks/:taskid", verifyFirebaseToken, async (req, res) => {
    try {
      const { userId } = req.params;

      // Optional: make sure token matches the requested userId
      if (req.user.uid !== userId) {
        return res
          .status(403)
          .json({ message: "Access denied: mismatched user." });
      }

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
        .json({ message: "Failed to delete task", error: err.message });
    }
  });

  router.put("/tasks/:taskId", verifyFirebaseToken, async (req, res) => {
    try {
      const { userId } = req.params;

      // Optional: make sure token matches the requested userId
      if (req.user.uid !== userId) {
        return res
          .status(403)
          .json({ message: "Access denied: mismatched user." });
      }

      const { taskId } = req.params;
      const { task, datetime, notes, isCompleted } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { task, datetime, notes, isCompleted },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res
        .status(200)
        .json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res
        .status(500)
        .json({ message: " Failed to update task", error: err.message });
    }
  });
});

module.exports = router;
