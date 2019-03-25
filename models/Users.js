const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    // _id: String,
    // contact: {
    // email: String,
    // phone: String
    // },
    // notifications: {
    // email: Boolean,
    // text: Boolean,
    // call: Boolean
    // },
    // favRoutes: []

    // _id: String,
    _id: String,
    name: String,
    email: String,
    phoneNumber: String,
    emailNote: Boolean,
    textNote: Boolean,
    callNote: Boolean,
    favRoutes: []
});
mongoose.model('Users', UsersSchema);

module.exports = mongoose.model('Users', UsersSchema);

