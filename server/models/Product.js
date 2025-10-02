const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: { type : String, required : false },
    productName: { type : String, required : true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;