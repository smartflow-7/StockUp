import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// sign in
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Enter correct Email" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      const token = createToken(user._id);
      const { name, email, balance, portfolio} = user;
      res.json({ success: true, token, user: { name, email, balance,portfolio } });
    } else {
      res.json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

// sign up
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter Strong password",
      });
    }

    // hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);

    const { balance, portfolio } = user;

    res.json({ success: true, token, user: { name, email, balance, portfolio } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something Went wrong" });
  }
};

// admin Login
const adminLogin = async (req, res) => {};

export { signIn, signUp, adminLogin };
