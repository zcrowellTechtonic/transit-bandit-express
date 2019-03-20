const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
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

    uid: String,
    email: String,
    phone: String,
    emailNote: Boolean,
    textNote: Boolean,
    callNote: Boolean,
    favRoutes: []
});
mongoose.model('Users', UsersSchema);

module.exports = mongoose.model('Users', UsersSchema);

