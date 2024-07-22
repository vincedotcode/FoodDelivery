import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 characters",
        success: false,
      });
    }

    // Check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists!",
        success: false,
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Register user
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).json({
      user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};

// Login a user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(422).json({
        message: "Please provide all fields!",
        success: false,
      });
    }

    // Password Validation
    if (password.length < 6) {
      return res.status(422).json({
        message: "Password length should be greater than 6 characters",
        success: false,
      });
    }

    // Check if user exists
    const getUser = await UserModel.findOne({ email });
    if (!getUser) {
      return res.status(404).json({
        message: "Invalid Credentials!",
        success: false,
      });
    }

    // Password match
    const comparePassword = await bcrypt.compare(password, getUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        message: "Incorrect Password, Please check again...",
        success: false,
      });
    }

    // Generate token
    const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Exclude password from the user object
    const { password: _, ...userWithoutPassword } = getUser.toObject();

    // Login success
    return res.status(200).json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};


// Get user details by ID
export const getUserDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
      error: err.message,
    });
  }
};


