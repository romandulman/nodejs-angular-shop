const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    id: Number,
    user_id: Number,
}, { timestamps: { created_at: 'created_at' } }
);

module.exports = mongoose.model('Cart', cartSchema);
