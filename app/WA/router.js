const express = require('express');
const router = express.Router();
const {
    index,
} = require('./controller');

/* GET home page. */
router.get('/users', index);

module.exports = router;
