const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_name: String,
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: Number,
    image_url: String,
}, {timestamps: {created_at: 'created_at'}});

module.exports = mongoose.model('Product', productSchema);
