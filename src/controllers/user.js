

import jwt from "jsonwebtoken";
import userModel from "../models/user";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
};
export const signup = async (req, res) => {
  try {
    const user = await userModel.create(req.body);

    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      token: token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "please provide email and password",
    });
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "failed",
      message: "incorrect email or password",
    });
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();

    res.status(200).json({
      status: "success",
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
