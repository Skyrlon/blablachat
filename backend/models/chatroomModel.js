const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatroomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Chatroom need a name"],
    },
    membersID: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      validate: [(v) => v.length > 1, "Need atleast 2 members"],
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Chatroom need a owner"],
    },
    messages: [
      {
        writerID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Message need a writer"],
        },
        time: {
          type: Number,
          required: [true, "Message need the time which was posted"],
        },
        text: {
          type: String,
        },
        modified: {
          type: Boolean,
          required: true,
        },
        deleted: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chatroom", chatroomSchema);
