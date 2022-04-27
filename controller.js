const WA = require('./model');

const index = async(req, res, next) => {
    try {
        const result = await WA.find();
        
        res.send({
            status: 'success',
            message: "Success getting all users data.",
            data: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Error getting all users data.",
            description: e.message,
        });
    }
}

module.exports = {
    index,
};
