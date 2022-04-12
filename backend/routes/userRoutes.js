const express = require("express");
const router = express.Router();
const {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getUser);

router.post("/login", loginUser);

router.post("/", registerUser);

router.put("/:id", protect, updateUser);

router.delete("/:id", protect, deleteUser);

module.exports = router;
