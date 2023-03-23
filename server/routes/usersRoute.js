const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();

//!REGISTER SERVISI
router.post("/register", async (req, res) => {
  const { name, mail, password } = req.body;

  const oldUser = await UserModel.findOne({ mail: mail });
  if (oldUser) {
    res.status(400).json({ message: "Böyle bir kullanıcı bulunmaktadır." });
  } else {
    const newUser = new UserModel({
      name: name,
      mail: mail,
      password: password,
    });
    try {
      await newUser.save();
      res.send("User register is succesfull");
    } catch (error) {
      res.send("User register is failed");
    }
  }
});
//!LOGIN SERVISI
router.post("/login", async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await UserModel.find({ mail: mail, password: password });
    if (user.length > 0) {
      res.send(user[0]);
    } else {
      res.status(400).json({ message: "User not found." });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;