import mongoose from 'mongoose';
const {
    Schema
} = mongoose;

const chatroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    membersID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages: [{
        writerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        text: {
            type: String
        },
        modified: {
            type: Boolean,
            required: true
        },
        deleted: {
            type: Boolean,
            required: true
        },
    }]
}, {
    timestamps: true,
})

module.exports = mongoose.model('Chatroom', chatroomSchema)