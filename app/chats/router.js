const express = require('express');
const router = express.Router();

const { 
    getAllUsers, 
    getUser,
    deleteContact,
    deleteChat
} = require('./controller');
router.get('/users', getAllUsers);
router.get('/user', getUser);
router.delete('/user/deleteContact', deleteContact);
router.delete('/user/clearChat', deleteChat);

module.exports = {
    getAllUsers,
    getUser,
    deleteContact,
    deleteChat,
};