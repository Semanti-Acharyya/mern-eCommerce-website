import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    // check if request body contains email and password
    const { email, password } = req.body;

    // check if user exists
    const existingUser = await userModel.findOne({ email });

    // if user does not exist, return error message
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // existingUser.password is saved in our database
    // bcrypt.compare() compares the password entered by user with the hashed password in the database
    // if the passwords match, it returns true, otherwise false
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      // if password is valid, create a token
      const token = createToken(existingUser._id);
      return res.json({ success: true, token });
    } else {
      // if password is not valid, return error message
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await userModel.findOne({ email });

    // if user exists, return error message when trying to register
    if (existingUser) {
      // send a proper HTTP status code
      // also include a success flag for frontend logic
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // validating email format & strength of password
    if (!validator.isEmail(email)) {
      // if email format is not valid, return error message
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      // if password is not strong, return error message
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: true, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, loginAdmin };
