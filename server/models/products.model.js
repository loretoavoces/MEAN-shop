const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    richDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    images: [{ type: String }],
    price: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    countInStock: { type: Number, required: true, min: 0, max: 255 },
    rating: { type: Number, default: 0 },
    numReviews: { tye: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now },
    brand: { type: String, required: true }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
