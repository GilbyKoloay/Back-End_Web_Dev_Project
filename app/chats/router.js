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
    postUserAddAccount,
    putUserPicture,
} = require('./controller');

router.get('/users', getAllUsers);
router.get('/user', getUser);
router.post('/user', postUser);
router.post('/user', postMessage);
router.delete('/user/deleteContact', deleteContact);
router.delete('/user/clearChat', deleteChat);
router.put('/user/name', putUserName);
router.put('/user/about', putUserAbout);
router.post('user/addaccount', postUserAddAccount);
router.put('user/picture', putUserPicture);

module.exports = router;
