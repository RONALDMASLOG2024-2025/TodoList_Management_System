const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./model/Task");
const User = require("./model/User");
const sendReminderEmail = require("./sendMail");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

let dbmsg = {};

// ——————
// Connect to MongoDB Atlas
// ——————
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    dbmsg = { database: "Ronald Maslog, your database is connected" };
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    dbmsg = { database: "Database connection lost!" };
  });

app.get("/api/database", (req, res) => res.json(dbmsg));
app.get("/api/hello", (req, res) =>
  res.json({ message: "Welcome Ronald Maslog... Your Todo List Task Today!" })
);

// your routes...
const verifyFirebaseRoute = require("./routes/verify-firebase");
app.use("/api", verifyFirebaseRoute);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api", require("./routes/task")); // if you really need it twice

// ——————
// CRON: Every minute, PH time
// ——————
cron.schedule(
  "* * * * *",
  async () => {
    // 1️⃣ Determine “now” and “window end” on the UTC timeline
    const now = new Date(); 
    const windowEnd = new Date(now.getTime() + 30 * 60 * 1000);

    // 2️⃣ Debug: show in both UTC‐ISO and PH‐local
    console.log("⏰ [CRON] UTC now:        ", now.toISOString());
    console.log(
      "⏰ [CRON] PH local now:   ",
      now.toLocaleString("en-PH", { timeZone: "Asia/Manila" })
    );
    console.log("⏰ [CRON] UTC windowEnd:  ", windowEnd.toISOString());
    console.log(
      "⏰ [CRON] PH local window:",
      windowEnd.toLocaleString("en-PH", { timeZone: "Asia/Manila" })
    );

    try {
      // 3️⃣ Fetch tasks in that 30‑minute window, still-unnotified
      const tasksToNotify = await Task.find({
        datetime: { $gte: now, $lte: windowEnd },
        notified: false,
      });

      console.log(
        `🔍 [CRON] tasks found: ${tasksToNotify.length}`,
        tasksToNotify.map((t) => ({
          id: t._id.toString(),
          // show each task’s PH‐local scheduled time for clarity
          scheduled: new Date(t.datetime).toLocaleString("en-PH", {
            timeZone: "Asia/Manila",
          }),
        }))
      );

      // 4️⃣ Send emails for exactly 30 or 1 minute left
      for (const task of tasksToNotify) {
        const msLeft = new Date(task.datetime).getTime() - now.getTime();
        const minsLeft = Math.round(msLeft / 60000);

        if (minsLeft === 30 || minsLeft === 1) {
          const user = await User.findOne({ uid: task.userId });
          if (!user) {
            console.warn(`[CRON] No user for task ${task._id}`);
            continue;
          }

          await sendReminderEmail(
            user.email,
            task.task,
            // pass PH‐local string so the email reads “8:10 AM”
            new Date(task.datetime).toLocaleString("en-PH", {
              timeZone: "Asia/Manila",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          );

          task.notified = true;
          await task.save();

          console.log(
            `✅ [CRON] Email sent to ${user.email} — ${minsLeft} min left for "${task.task}"`
          );
        }
      }
    } catch (err) {
      console.error("[CRON ERROR]", err);
    }
  },
  {
    timezone: "Asia/Manila", // ensure the *trigger* respects PH clock
  }
);

// ——————
// Start server
// ——————
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
