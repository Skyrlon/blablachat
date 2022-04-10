const asyncHandler = require("express-async-handler")
const Chatroom = require("../models/chatroomModel")

//Get chatroom data
const getChatroom = asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)
    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }
    res.status(200).json(chatroom)
})

//Create a new chatroom
const createChatroom = asyncHandler(async (req, res) => {
    if (!req.body.name || req.body.membersID || req.body.ownerID) {
        res.status(400)
        throw new Error('Give all infos')
    }
    const chatroom = await Chatroom.create({
        name: req.body.name,
        membersID: req.body.membersID,
        ownerID: req.body.ownerID
    })
    res.status(200).json(chatroom)
})

//Update chatroom
const updateChatrooom = asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)
    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }
    const updatedChatroom = await Chatroom.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedChatroom)
})

////Delete chatroom
const deleteChatroom = asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)
    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }
    await chatroom.remove()
    res.status(200).json({
        id: req.params.id
    })
})

//Add new message
const addMessage = asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)
    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }
    const message = await Chatroom.findByIdAndUpdate(req.params.id, {
        $push: {
            messages: req.body
        }
    }, {
        new: true,
        upsert: true,
        runValidators: true
    })
    res.status(200).json(message)
})

//Update message
const updateMessage = asyncHandler(async (req, res) => {
    const chatroom = await Chatroom.findById(req.params.id)
    if (!chatroom) {
        res.status(400)
        throw new Error('Chatroom not found')
    }
    const message = await Chatroom.findOneAndUpdate({
        _id: req.params.id,
        "messages._id": req.params.idMessage
    }, {
        $set: {
            'messages.$.time': req.body.time,
            'messages.$.text': req.body.text,
            'messages.$.deleted': req.body.deleted,
            'messages.$.modified': req.body.modified,
            'messages.$.writerID': req.body.writerID,
        }
    }, {
        new: true,
        runValidators: true
    })
    res.status(200).json(message)
})

module.exports = {
    getChatroom,
    createChatroom,
    updateChatrooom,
    deleteChatroom,
    addMessage,
    updateMessage
}