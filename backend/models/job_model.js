const mongoose = require('mongoose');
module.exports = function(app, db) {
    
    const Schema = mongoose.Schema;

    const jobSchema = new Schema({

        title:          String,
        description:    String,
        posted:         Date,
        sector:         String,
        location:       String,
        salary:         Number,
        salaryType:     String

    });

    function CreateJob(newJob){
        let job = new jobSchema(newJob);
        job.save(function (err) {
            if (err) return handleError(err); // saved!
         });
        return job;
    }

    function handleError(err){
        // log error here
        console.log(err);
    }

});
