const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: Number,
    product_name: String,
    cat_id: Number,
    price: Number,
    image_url: String,
}, {timestamps: {created_at: 'created_at'}});

module.exports = mongoose.model('Product', productSchema);
