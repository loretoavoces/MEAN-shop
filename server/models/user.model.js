const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false },
    street: { type: String, default: '' },
    apartment: { type: String, default: '' },
    zip :{ type: String, default: '' },
    city: { type: String, default: '' },
    username: { type: String, unique: true, required: true},
    country: { type: String, default: '' }
});

const User = mongoose.model('User', userSchema);
module.exports = User