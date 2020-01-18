const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
        user_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        },
        cart_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Cart'
        },
        total_price: Number, // for whole order
        city: String,
        street: String,
        order_send_date: Date,
        last_cc_digits: String,
    }, {timestamps: {created_at: 'created_at'}}
);

module.exports = mongoose.model('Order', orderSchema);
