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
        try{
            let job = new jobSchema(newJob);
            job.save(function (err) {
                if (err) {handleError(err);}// not saved!
            });
            return job;
        } catch (error) {
            handleError(error);
        }
        return null;
    }

    function DeleteJob(jobId) {
        try {
            var result = await JobModel.deleteOne({ _id: jobId }).exec();
            return result > 0;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    function GetJobs(options, pagenumber=1, resultsPerPage=10){
        // options is the search parameters eg sector, location, min salary, contract type etc.
        return null;
    }

    function GetJob(jobId){
        return null;
    }

    function UpdateJob(jobId, newJob){
        try {
            var job = await JobMModel.findById(request.params.id).exec();
            job.set(newJob));
            var result = await job.save();
            return result;
        } catch (error) {
            handleError(err);
            return null
        }

    }

    function handleError(err){
        // log error here
        console.log(err);
    }
};
