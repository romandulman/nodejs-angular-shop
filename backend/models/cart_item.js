const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({  //was let
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    cart_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    quantity:Number,
    total_price:Number,  //for quantity

});

module.exports = mongoose.model('CartItem', productSchema);
