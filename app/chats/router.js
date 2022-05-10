const express = require('express');
const router = express.Router();

const { 
    getAllUsers, getUser
} = require('./controller');
router.get('/user', getAllUsers);
router.get('/user', getUser);

module.exports = router;


const { 
    deleteContact,
    deleteChat
} = require('./controller');
router.delete('/user/deleteContact', deleteContact);
router.delete('/user/clearChat', deleteChat);

module.exports = router;
