const express = require('express');
const router = express.Router();
const { 
    deleteContact,
    deleteChat
} = require('./controller');
router.delete('/user/deleteContact', deleteContact);
router.delete('/user/clearChat', deleteChat);

module.exports = router;
