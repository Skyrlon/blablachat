const express = require("express")
const router = express.Router()
const {
    getChatroom,
    createChatroom,
    updateChatrooom,
    deleteChatroom,
    addMessage,
    updateMessage
} = require("../controllers/chatroomController")


router.get('/:id', getChatroom)
router.post("/", createChatroom)
router.put("/:id", updateChatrooom)
router.delete("/:id", deleteChatroom)
router.post("/:id/messages", addMessage)
router.put("/:id/messages/:idMessage", updateMessage)

module.exports = router;