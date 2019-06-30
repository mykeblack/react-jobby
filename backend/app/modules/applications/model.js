const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    jobId:          String,
    userId:         String,
    coveringLetter: String,
    cvFile:         String,
    created:        Date,
    latitude:       Number,
    status:         String
});

module.exports = mongoose.model( "applications", appSchema);