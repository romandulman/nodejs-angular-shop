const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({  //was let
   first_name: String,
    last_name:String,
    city:String,
    street: String,
    personal_id: String,
    email: String,
    is_admin: Boolean
});

module.exports = mongoose.model('User', userSchema);
