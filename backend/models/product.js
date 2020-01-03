const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({  //was let
    product_id: Number,
    product_name: String,
    cat_id:Number,
    price:Number,
    image_url:String,
});

module.exports = mongoose.model('Product', productSchema);
