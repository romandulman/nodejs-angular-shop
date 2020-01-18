const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({  //was let
    title: String
});

module.exports = mongoose.model('Category', categorySchema);
