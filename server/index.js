const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Task = require("./model/Task");
const User = require("./model/User");

const app = express();
app.use(cors());
app.use(express.json());

var dbmsg = {};

//My Database connection USING MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    dbmsg = { database: "Ronald Maslog your database is connected" };
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    dbmsg = { database: "Database connection lost!" };
  });

app.get("/api/database", (req, res) => {
  res.json(dbmsg);
});

console.log(dbmsg);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Welcome Ronald Maslog... Your Todo List Task Today!" });
});

const verifyFirebaseRoute = require("./routes/verify-firebase");
app.use("/api", verifyFirebaseRoute);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const taskRoutes = require("./routes/task");
app.use("/api/tasks", taskRoutes);
app.use("/api", taskRoutes);


const cron = require('node-cron');
const sendReminderEmail = require('./sendMail');

// Every minute: Check tasks and send reminders

cron.schedule('* * * * *', async () => {
  console.log("[CRON] Checking for upcoming tasks...");
  const now = new Date();
  const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60000);
  const oneMinFromNow = new Date(now.getTime() + 1 * 60000);

  try {
    // Get tasks within the next 30 mins that haven't been notified
    const tasksToNotify = await Task.find({
      datetime: {
        $gte: now,
        $lte: thirtyMinsFromNow
      },
      notified: false
    });

    for (const task of tasksToNotify) {
      const minsLeft = Math.floor((new Date(task.datetime) - now) / 60000);

      // Get user associated with the task
      const user = await User.findOne({ uid: task.userId }); // Update this if your schema uses different field
      if (!user) {
        console.warn(`[WARNING] No user found for task: ${task._id}`);
        continue;
      }

      // Only send if it's 30 mins or 1 min left
      if (minsLeft === 30 || minsLeft === 1) {
        await sendReminderEmail(user.email, task.task, task.datetime);

        // Update task to prevent re-sending
        task.notified = true;
        await task.save();

        console.log(`[EMAIL SENT to ${user.email}] ${minsLeft} min(s) before: ${task.task}`);
      }
    }
  } catch (error) {
    console.error("[CRON ERROR]", error);
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
