const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title:          String,
    firstname:      String,
    lastname:       String,
    Role:           String,
    Email:          String,
    Telephone:      String,
    created:        Date,
    updated:        Date,
    location:       String,
    public:         Boolean,
    archived:       Boolean,
    skills:         [String],
    profile:        String,
});

module.exports = mongoose.model( "users", userSchema);