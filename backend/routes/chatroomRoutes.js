const express = require("express");
const router = express.Router();
const {
  getChatrooms,
  createChatroom,
  updateChatrooom,
  deleteChatroom,
  addMessage,
  updateMessage,
} = require("../controllers/chatroomController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getChatrooms);

router.post("/", protect, createChatroom);

router.put("/:id", protect, updateChatrooom);

router.delete("/:id", protect, deleteChatroom);

router.put("/:id/messages", protect, addMessage);

router.put("/:id/messages/:idMessage", protect, updateMessage);

module.exports = router;
