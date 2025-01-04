const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    conversationId: {
        //ID của cuộc hội thoại mà tin nhắn thuộc về.
        type: String,
    },
    senderId: {
        // ID của người gửi tin nhắn.
        type: String,
    },
    message: {
        //Nội dung tin nhắn.
        type: String,
    },
});

const Messages = mongoose.model("Message", messageSchema);

module.exports = Messages;
