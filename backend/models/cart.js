const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
}, { timestamps: { created_at: 'created_at' } }
);

module.exports = mongoose.model('Cart', cartSchema);
