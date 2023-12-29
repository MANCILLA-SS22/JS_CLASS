const mongoose = require('mongoose');

const chatCollection = 'chat';

const chatSchema = new mongoose.Schema({
    user: String,
    message: String
});

const Chat = mongoose.model(chatCollection, chatSchema);

module.exports = Chat;