const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name:          String,
    description:    String, 
});

module.exports = mongoose.model( "skills", skillSchema);