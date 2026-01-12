import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Register user
// @route POST /api/users/register
export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ fullname, email, password });

  res.status(201).json({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    wallet: user.wallet,
    token: generateToken(user._id),
  });
};

// @desc Login user
// @route POST /api/users/login
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      wallet: user.wallet,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc Get user profile
// @route GET /api/users/profile
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};
