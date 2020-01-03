const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({  //was let
    item_id: Number,
    product_id: Number,
    cart_id:Number,
    quantity:Number,
    total_price:Number,  //for quantity

});

module.exports = mongoose.model('Product', productSchema);
