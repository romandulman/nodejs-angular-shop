const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
        id: Number,
        user_id: Number,
        cart_id: Number,
        total_price: Number, // for whole order
        city: String,
        street: String,
        order_send_date: Date,
        last_cc_digits: String,
    }, {timestamps: {created_at: 'created_at'}}
);

module.exports = mongoose.model('Order', orderSchema);
