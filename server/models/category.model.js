const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    color: { type: String },
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 
