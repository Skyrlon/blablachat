const asyncHandler = require("express-async-handler");
const Chatroom = require("../models/chatroomModel");

//Get chatrooms data
const getChatrooms = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.find({
    _id: {
      $in: req.body.ids,
    },
  });
  if (!chatroom) {
    res.status(400);
    throw new Error("Chatroom not found");
  }
  res.status(200).json(chatroom);
});

//Create a new chatroom
const createChatroom = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.membersID) {
    res.status(400);
    throw new Error("Give all infos");
  }
  const chatroom = await Chatroom.create({
    name: req.body.name,
    membersID: [...req.body.membersID, req.user.id],
    ownerID: req.user.id,
  });
  res.status(200).json(chatroom);
});

//Update chatroom
const updateChatrooom = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.findById(req.params.id);
  if (!chatroom) {
    res.status(400);
    throw new Error("Chatroom not found");
  }

  //Only chatroom's owner can change its name
  if (req.body.name && chatroom.ownerID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedChatroom = await Chatroom.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedChatroom);
});

//Delete chatroom
const deleteChatroom = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.findById(req.params.id);
  if (!chatroom) {
    res.status(400);
    throw new Error("Chatroom not found");
  }

  if (chatroom.ownerID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await chatroom.remove();
  res.status(200).json({
    id: req.params.id,
  });
});

//Add new message
const addMessage = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.findById(req.params.id);
  if (!chatroom) {
    res.status(400);
    throw new Error("Chatroom not found");
  }
  const message = await Chatroom.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        messages: { ...req.body, writerID: req.user.id },
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
  res.status(200).json(message);
});

//Update message
const updateMessage = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.findById(req.params.id);
  if (!chatroom) {
    res.status(400);
    throw new Error("Chatroom not found");
  }

  const messageToModify = await Chatroom.findOne({
    _id: req.params.id,
    "messages._id": req.params.idMessage,
  });

  if (messageToModify.writerID.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const message = await Chatroom.findOneAndUpdate(
    {
      _id: req.params.id,
      "messages._id": req.params.idMessage,
    },
    {
      $set: {
        "messages.$.time": req.body.time,
        "messages.$.text": req.body.text,
        "messages.$.deleted": req.body.deleted,
        "messages.$.modified": req.body.modified,
        "messages.$.writerID": req.user.id,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(message);
});

module.exports = {
  getChatrooms,
  createChatroom,
  updateChatrooom,
  deleteChatroom,
  addMessage,
  updateMessage,
};
