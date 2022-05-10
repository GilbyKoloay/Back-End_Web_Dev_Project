const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['send', 'receive'],
    },
    date: {
        type: Date,
    },
    read: {
        type: Boolean,
        default: false,
    },
    msg: String,
});

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, "Phone number is requierd."],
    },
    country: {
        type: Object,
        name: {
            type: String,
            // enum: ['Indonesia'],
            required: [true, "Country Name is required."],
        },
        code: {
            type: String,
            // enum : ['62'],
            required: [true, "Country Code is required."],
        },
    },
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    about: {
        type: String,
        default: "Hey there! I am using WhatsApp.",
    },
    picture: {
        type: String,
        default: null,
        // data: Buffer,
        // contentType: String,
    },
    lastSeen: {
        type: Date,
        default: null,
    },
    // contacts: {
    //     type: Array,
    //     default: null,
    // },
    contacts: [{
        _id: mongoose.SchemaTypes.ObjectId,
        contactName: {
            type: String,
            required: [true, "Contact Name is required."],
        },
        chats: [chatSchema],
        // chats: {
        //     type: Array,
        //     default: null,
        // },
    }],
});

module.exports = mongoose.model('data', userSchema);
