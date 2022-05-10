const express = require('express');
const router = express.Router();

const { 
    getAllUsers, 
    getUser,
    deleteContact,
    deleteChat,
    putUserName,
    putUserAbout,
    postUser,
    postMessage,
} = require('./controller');

router.get('/users', getAllUsers);
router.get('/user', getUser);
router.get('/user', postUser);
router.get('/user', postMessage);
router.delete('/user/deleteContact', deleteContact);
router.delete('/user/clearChat', deleteChat);
router.put('/user/name', putUserName);
router.put('/user/about', putUserAbout);

module.exports = router;
