const Schema1 = require("../models/Register");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Register Function
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Check if username is already taken
    const checkUser = await Schema1.findOne({ username });
    if (checkUser) {
      return res.json({
        success: false,
        message: "Username already used",
      });
    }

    // Check if email is already taken
    const checkEmail = await Schema1.findOne({ email });
    if (checkEmail) {
      return res.json({
        success: false,
        message: "Email already used",
      });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Save the new user
    const obj = new Schema1({ username, email, password: hashed });
    const data = await obj.save();

    // Remove the password before sending the response
    const { password: _, ...userData } = data._doc;
    return res.json({
      success: true,
      message: userData,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Server error" });
  }
};

// Login Function
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const checkUser = await Schema1.findOne({ username });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }


    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    
    return res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        _id:checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
        isavaImage: checkUser.isavaImage || false,
        avaImage: checkUser.avaImage || null,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Server error" });
  }
};

// Set Avatar Function
exports.setAvatar = async (req, res, next) => {
  try {
    const username = req.params.id; 
    const avaImage = req.body.image; 


    const userData = await Schema1.findOneAndUpdate(
      { username }, 
      {
        isavaImage: true,
        avaImage: avaImage, // Store the avatar image
      },
      { new: true, runValidators: true } // Return updated document
    );

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found or update failed",
      });
    } else {
      return res.json({
        isSet: userData.isavaImage, // Return updated avatar status
        image: userData.avaImage, // Return updated avatar image
        success: true,
        message: "Avatar set successfully",
      });
    }
  } catch (err) {
    console.log("Error during avatar setting:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Users Function
exports.getalluser = async (req, res) => {
  try {
    const username = req.params.id; // Current user's username
    const userData = await Schema1.find();

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    // Filter out current user and remove passwords from other users
    const afterData = userData
      .filter((user) => user.username !== username) // Exclude current user
      .map((user) => {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      });

    return res.json({
      data: afterData, // List of other users without passwords
      success: true,
      message: "Users fetched successfully",
    });
  } catch (err) {
    console.log("Error fetching users:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
