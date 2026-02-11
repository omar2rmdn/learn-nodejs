import { validationResult } from "express-validator";
import { comparePass, hashPass } from "../../utils/hash-pass.js";
import { User } from "./users.model.js";
import generateToken from "../../utils/generate-token.js";

// get all
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    status: "success",
    message: "users fetched successfully",
    data: users,
  });
};

// register
const register = async (req, res) => {
  // validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "validation failed",
      errors: errors.array(),
    });
  }

  // check if user already exists
  const { password, email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      status: "fail",
      message: "user already exists",
    });
  }

  // hash password
  const hashedPass = await hashPass(password);

  // create user
  const userData = {
    ...req.body,
    password: hashedPass,
  };

  if (req.file) {
    userData.avatar = "uploads/" + req.file.filename;
  }

  const user = new User(userData);

  // generate token
  const token = generateToken({
    email: user.email,
    id: user._id,
    role: user.role,
  });

  // save user to database
  await user.save();

  // exclude password from response
  const { password: _, ...userResponse } = user.toObject();

  res.status(201).json({
    status: "success",
    message: "user registered successfully",
    data: { ...userResponse, token },
  });
};

// login
const login = async (req, res) => {
  // check if data is missing
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "all fields are required",
    });
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user was not found",
    });
  }

  // check if password is valid
  const validPass = await comparePass(password, user.password);

  if (!validPass) {
    return res.status(400).json({
      status: "fail",
      message: "invalid password",
    });
  }

  // generate token
  const token = generateToken({
    email: user.email,
    id: user._id,
    role: user.role,
  });

  // exclude password from response
  const { password: _, ...userResponse } = user.toObject();

  res.status(200).json({
    status: "success",
    message: "login successful",
    data: { ...userResponse, token },
  });
};

export { getAllUsers, login, register };
