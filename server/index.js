const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

var dbmsg;

//My Database connection USING MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    dbmsg = "Ronald Maslog your database is connected";
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    dbmsg = "Database connection lost!";
  });

app.get("/api/database", (req, res) => {
  res.json({ database: dbmsg });
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Welcome Ronald Maslog... Your Todo Task Today!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
