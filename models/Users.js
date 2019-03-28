const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({

    _id: String,
    name: String,
    email: String,
    phoneNumber: String,
    emailNote: Boolean,
    textNote: Boolean,
    callNote: Boolean,
    favRoutes: [],
    theme: String
});
mongoose.model('Users', UsersSchema);

module.exports = mongoose.model('Users', UsersSchema);

