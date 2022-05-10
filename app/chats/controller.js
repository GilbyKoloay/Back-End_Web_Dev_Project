const WA = require('./model');
const { ObjectID } = require('mongodb');

const getAllUsers = async(req, res, next) => {
    try {
        let result = await WA.find();
        result = result.map(r => {
            (`phone` in req.query) || (r[`phone`] = undefined);
            (`country` in req.query) || (r[`country`] = undefined);
            (`name` in req.query) || (r[`name`] = undefined);
            (`about` in req.query) || (r[`about`] = undefined);
            (`picture` in req.query) || (r[`picture`] = undefined);
            (`lastSeen` in req.query) || (r[`lastSeen`] = undefined);
            (`contacts` in req.query) || (r[`contacts`] = undefined);
            (`__v` in r) && (r[`__v`] = undefined);
            return r;
        });
        
        res.send({
            status: 'success',
            message: "Success getting all users data.",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Error getting all users data.",
            desc: e.message,
        });
    }
};

const getUser = async(req, res, next) => {
    try {
        const result = await WA.find(req.query);

        res.send({
            status: 'success',
            message: "Success getting user using id",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Error getting user using id",
            desc: e.message,
        });
    }
};

const deleteContact = async(req, res, next) => {
    try {
        const {user, contact} = req.body;

        const userData = await WA.find({_id: user});
        let userDataContacts = userData[0].contacts.filter((r) => r._id.toString() !== contact);
        
        const result = await WA.updateOne({_id: user}, {$set: {
            contacts: userDataContacts,
        }});

        res.send({
            status: 'success',
            message: "Contact successfully deleted.",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Failed to delete contact.",
            desc: e.message,
        });
    }
};

const deleteChat = async(req, res, next) => {
    try {
        const {user, contact} = req.body;

        const userData = await WA.find({_id: user});
        let userDataContacts = userData[0].contacts.map(r => {
            if(contact === r._id.toString()) {
                r.chats = null;
                return r;
            }
            else {
                return r;
            }
        });
        
        const result = await WA.updateOne({_id: user}, {$set: {
            contacts: userDataContacts,
        }});

        res.send({
            status: 'success',
            message: "Chat successfully deleted.",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Failed to clear chat.",
            desc: e.message,
        });
    }
}

const putUserName = async(req, res, next) => {
    try {
        const {name} = req.body;

        const result = await WA.updateOne(req.query, {$set: {
            name: name,
        }});

        res.send({
            status: 'success',
            message: "User's name updated successfully",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Unable to save user's name.",
            desc: e.message,
        });
    }
};

const putUserAbout = async(req, res, next) => {
    try {
        const {about} = req.body;

        const result = await WA.updateOne(req.query, {$set: {
            about: about,
        }});

        res.send({
            status: 'success',
            message: "User's about updated successfully.",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Unable to save user's about.",
            desc: e.message,
        });
    }
};



module.exports = {
    getAllUsers,
    getUser ,
    deleteContact,
    deleteChat,
    putUserName,
    putUserAbout,
};
