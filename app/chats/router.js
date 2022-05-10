const express = require('express');
const router = express.Router();

const { 
    getAllUsers, 
    getUser,
    deleteContact,
    deleteChat,
    putUserName,
    putUserAbout,
} = require('./controller');
router.get('/users', getAllUsers);
router.get('/user', getUser);
router.delete('/user/deleteContact', deleteContact);
router.delete('/user/clearChat', deleteChat);
router.put('/user/name', putUserName);
router.put('/user/about', putUserAbout);

module.exports = {
    getAllUsers,
    getUser,
    deleteContact,
    deleteChat,
    putUserName,
    putUserAbout,
};