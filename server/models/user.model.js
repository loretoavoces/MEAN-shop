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
    username: { type: String, unique: true },
    country: { type: String, default: '' }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});


const User = mongoose.model('User', userSchema);
module.exports = User