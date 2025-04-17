const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.post("/", async (req, res) => {
  console.log("Incoming data:", req.body);
  const { name, email, uid } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, uid });
      await user.save();
    }
    console.log(user);
    res.status(200).json({ message: "User stored", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error *HH*" });
  }
});

module.exports = router;
