const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../Models/user_model");
const { generateToken } = require("../Utils/generateToken");

// Register User
module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, name, username } = req.body;

        // Check if email already exists
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).json({ message: "Email already exists" });

        // Check if username already exists
        let usernameExists = await userModel.findOne({ username: username });
        if (usernameExists) return res.status(401).json({ message: "Username is already taken" });

        // Hash password
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(500).send(err.message);

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.status(500).send(err.message);

                // Create new user
                let newUser = await userModel.create({
                    email: email,
                    password: hash,
                    name: name,
                    username: username
                });

                // Generate JWT token
                let token = generateToken(newUser);

                // Set token in cookies and return success response
                res.cookie("token", token, { httpOnly: true }); // Use httpOnly for better security
                res.status(201).json({
                    message: "User created successfully",
                    user: {
                        id: newUser._id,
                        email: newUser.email,
                        name: newUser.name,
                        username: newUser.username
                    }
                });
            });
        });

    } catch (err) {
        // Catch and send error
        res.status(500).json({ message: err.message });
    }
};

module.exports.loginUser = async function(req, res){
    try {
        let{username, password} = req.body;
        let user = await userModel.findOne({username: username});
        if(!user) return res.status(401).json({message: "Invalid username or password"})
        bcrypt.compare(password, user.password, function(err, isMatch){
          if(err) return res.send(err.message);
          if(!isMatch) return res.status(401).json({message: "Invalid password"});
          let token = generateToken(user);
          res.cookie("token", token, {
            httpOnly: true, // Prevent access to cookie from JavaScript
            secure: process.env.NODE_ENV === "production", // Set secure flag in production
            sameSite: "strict", // Prevent CSRF
        });
          res.json({message: "Logged in successfully", user: user});
        })
    }catch(err){res.send(err.message);}
}
