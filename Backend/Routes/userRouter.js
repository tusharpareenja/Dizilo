const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userModel = require("../Models/user_model"); // This is correct
const { registerUser, loginUser } = require("../Controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;