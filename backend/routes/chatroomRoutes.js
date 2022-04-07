const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const Chatroom = require("../models/chatroomModel");

//Get chatroom
router.get('/:id', asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)

    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }

    res.status(200).json(chatroom)
}))

//Create a new chatroom
router.post("/", asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.create({
        name: req.body.name,
        membersID: req.body.membersID,
        ownerID: req.body.ownerID
    })
    res.status(200).json(chatroom)
}))

//Update user's info
router.put("/:id", asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)
    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }
    const updatedChatroom = await Chatroom.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedChatroom)
}))

//Delete user
router.delete("/:id", asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)
    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }
    await chatroom.remove()
    res.status(200).json({
        id: req.params.id
    })
}))

module.exports = router;