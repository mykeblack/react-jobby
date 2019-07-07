const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    jobId:          String,
    userId:         String,
    coverLetter:    String,
    cvFile:         String,
    created:        Date,
    status:         String
});

module.exports = mongoose.model( "applications", appSchema);