const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title:          String,
    description:    String,
    posted:         Date,
    sector:         String,
    location:       String,
    minSalary:      Number,
    maxSalary:      Number,
    salaryType:     String,
    archived:       Boolean,
    skills:         [String],
    jobType:        String,
    contracType:    String
});

module.exports = mongoose.model( "jobs", jobSchema);
