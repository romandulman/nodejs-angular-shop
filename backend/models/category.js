const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({  //was let
    id: Number,
    title: String
});

module.exports = mongoose.model('Category', categorySchema);
