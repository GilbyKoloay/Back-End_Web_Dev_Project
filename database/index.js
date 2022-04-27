const mongoose = require('mongoose');
const { mongoUrl } = require('../config');

mongoose.connect(mongoUrl)
    .then(res => console.log(`Database connection success.`))
    .catch(error => console.log(`Database connection fail. (${error.message})`));
