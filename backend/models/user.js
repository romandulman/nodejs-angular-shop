const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({  //was let
        first_name: String,
        last_name: String,
        username: String,
        city: String,
        street: String,
        personal_id: String,
        password: String,
        is_admin: Boolean
    }, {timestamps: {created_at: 'created_at'}}
);

module.exports = mongoose.model('User', userSchema);
