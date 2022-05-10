const WA = require('./model');
const { ObjectID } = require('mongodb');

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


module.exports = {
    deleteContact,
    deleteChat,
};
