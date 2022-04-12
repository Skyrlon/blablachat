const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Get user's infos
const getFilteredUsers = asyncHandler(async (req, res) => {
  const user = await User.find({
    _id: {
      $in: req.body.ids,
    },
  }).select("-password");
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

//Connect User

const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({
    name,
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid login infos");
  }
});

//Create a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({
    name,
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.status(200).json(user);
});

//Update user's info
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  let requestBody = req.body;
  //Hash new password if there is one
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    requestBody = { ...req.body, password: hashedPassword };
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, requestBody, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

//Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.remove();
  res.status(200).json({
    id: req.params.id,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  getFilteredUsers,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
};
