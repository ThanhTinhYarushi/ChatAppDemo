const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    //* ID của cuộc hội thoại mà tin nhắn thuộc về.
    conversationId: {
        type: String,
    },
    //* ID của người gửi tin nhắn.
    senderId: {
        type: String,
    },
    //* Nội dung tin nhắn.
    message: {
        type: String,
    },
});

const Messages = mongoose.model("Message", messageSchema);

module.exports = Messages;
