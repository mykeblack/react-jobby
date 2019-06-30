const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name:           String,
    parent:         String,
    longitude:      Number,
    latitude:       Number
});

module.exports = mongoose.model( "locations", locationSchema);
