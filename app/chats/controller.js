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

const postUser = async(req, res, next) => {
    try {
        const {phone, country, name} = req.body;

        const result = await WA.create({
            phone: phone,
            country: {
                name: country.name,
                code: country.code,
            },
            name: name,
        });

        res.send({
            status: 'success',
            message: "Success inserting new user.",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Error inserting new user.",
            desc: e.message,
        });
    }
};

const postMessage = async(req, res, next) => {
    try {
        const {sender, receiver, message} = req.body;
        
        const senderDataGet = await WA.find({_id: ObjectID(sender)});

        let senderIndex = null;
        senderDataGet[0].contacts.forEach((r, i) => {
            if(receiver === r._id.toString()) {
                senderIndex = i;
            }
        });

        let senderDataGetTemp = senderDataGet[0].contacts;
        const senderUpdate = {
            type: 'send',
            date: new Date(),
            read: false,
            msg: message,
        };
        if(senderDataGetTemp[senderIndex].chats === null) {
            senderDataGetTemp[senderIndex].chats = [senderUpdate];
        }
        else {
            senderDataGetTemp[senderIndex].chats.push(senderUpdate);
        }

        const senderDataUpdate = await WA.updateOne({_id: ObjectID(sender)}, {$set: {
            contacts: senderDataGetTemp,
        }});

        const receiverDataGet = await WA.find({_id: ObjectID(receiver)});

        let receiverIndex = null;
        receiverDataGet[0].contacts.forEach((r, i) => {
            if(sender === r._id.toString()) {
                receiverIndex = i;
            }
        });
        
        let receiverDataGetTemp = receiverDataGet[0].contacts;
        const receiverUpdate = {
            type: 'receive',
            date: new Date(),
            read: false,
            msg: message,
        };
        if(receiverDataGetTemp[receiverIndex].chats === null) {
            receiverDataGetTemp[receiverIndex].chats = [receiverUpdate];
        }
        else {
            receiverDataGetTemp[receiverIndex].chats.push(receiverUpdate);
        }

        const receiverDataUpdate = await WA.updateOne({_id: ObjectID(receiver)}, {$set: {
            contacts: receiverDataGetTemp,
        }});

        
        res.send({
            status: 'success',
            message: "Success saving message",
            desc: {
                sender: senderDataUpdate,
                receiver: receiverDataUpdate,
            },
        })
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Error saving message",
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

const postUserAddAccount = async(req, res, next) => {
    try {
        const {name, phone, contacts} = req.body;

        let user = null;
        const allUsers = await WA.find();
        allUsers.forEach(r => {
            if(r.phone === phone && r.phone) {
                user = r;
            }
        });

        if(user === null) {
            res.send({
                status: 'error',
                message: "Unable to add new contact",
                desc: "Phone number does not exist.",
            });
        }
        else {
            let exist = false;
            (contacts.length > 0) && contacts.forEach(r => {
                if(r.phone === phone) {
                    exist = true;
                    res.send({
                        status: 'error',
                        message: "Unable to add new contact",
                        desc: "Contact already exist.",
                    });
                }
            });

            if(exist === false || contacts.length === 0) {
                contacts.push({
                    _id: user._id,
                    contactName: name,
                    chats: null,
                });

                const result = await WA.updateOne(req.query, {$set: {
                    contacts: contacts,
                }});
                
                res.send({
                    status: 'success',
                    message: "New contact successfully added.",
                    desc: result,
                });
            }
        }
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Error adding new contact to user",
            desc: e.message,
        });
    }
};

const putUserPicture = async(req, res, next) => {
    try {
        const {_id} = req.query;
        const {uri} = req.body;

        const result = await WA.updateOne({_id: _id}, {$set: {
            picture: uri,
        }});

        res.send({
            status: 'success',
            message: "User's profile picture updated successfully.",
            desc: result,
        });
    }
    catch(e) {
        res.send({
            status: 'error',
            message: "Unable to save user's profile picture.",
            desc: e.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getUser ,
    postUser,
    postMessage,
    deleteContact,
    deleteChat,
    putUserName,
    putUserAbout,
    postUserAddAccount,
    putUserPicture,
};
