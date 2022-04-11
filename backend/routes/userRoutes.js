const express = require("express");
const router = express.Router();
const {
  getUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUser);

router.post("/login", loginUser);

router.post("/", registerUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
