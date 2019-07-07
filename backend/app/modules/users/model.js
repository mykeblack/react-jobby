const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title:          String,
    firstname:      String,
    lastname:       String,
    role:           String,
    email:          {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required:true
    },
    telephone:      String,
    created:        Date,
    updated:        Date,
    location:       String,
    public:         Boolean,
    archived:       Boolean,
    skills:         [String],
    profile:        String,
    cv:             String
    //cvs:            [cvSchema],
});
/*
// todo - create facility for multiple CVs
const cvSchema = new mongoose.Schema({
    title:          String,
    public:         Boolean,
    primary:        Boolean

})
*/

module.exports = mongoose.model( "users", userSchema);