const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
    name:           String,
    parent:         String,
});

module.exports = mongoose.model( "sectors", sectorSchema);