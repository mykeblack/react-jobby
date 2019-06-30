const mongoose = require('mongoose');
const jobModel = require('./../../modules/jobs/model.js');

module.exports =  {

    CreateJob : function (jobObject){
        try {
            var job = new jobModel(jobObject); 
            job.save(function (err, result) {
                if (err) {console.log(err);}
            });
            return job;
        } catch (error) {
            console.log(error);
        };
        return {error: "save failed"};
    },


    DeleteJob: function (jobId) {
        try {
            var result = db.jobs.deleteOne({"id":jobId});
        } catch (error) {
            HandleError(error);
            return false;
        }
    },

    GetJobs: async function(searchOptions){
        // options is the search parameters
        try{
            var pageNumber = searchOptions.pageNumber || 1;
            var resultsPerPage = searchOptions.resultsPerPage || 10;
            var sortBy = searchOptions.sortBy || 'posted';
            const skipResults = (pageNumber-1) * resultsPerPage;
            const limit = resultsPerPage * pageNumber
            // map search object to dbdbQueryObject
            var dbQueryObject= {};
            if (searchOptions.title) {dbQueryObject.title = new RegExp(searchOptions.title);}
            if (searchOptions.sector) {dbQueryObject.sector = new RegExp(searchOptions.sector);}
            if (searchOptions.location) {dbQueryObject.location = new RegExp(searchOptions.location);}
            if (searchOptions.contractType) {dbQueryObject.contractType = new RegExp(searchOptions.contractType);}
            if (searchOptions.jobType) {dbQueryObject.jobType = new RegExp(searchOptions.jobType);}
            if (searchOptions.salary) {
                dbQueryObject.minSalary = "$gt: " + searchOptions.salary;
                dbQueryObject.maxSalary = "$lt: " + searchOptions.salary;
            }
            if (searchOptions.salarytype) {dbQueryObject.salarytype = searchOptions.salarytype;}
            if (searchOptions.posted) {dbQueryObject.posted = "$gt: " + searchOptions.posted;}
            if (searchOptions.keywords) {dbQueryObject.keywords = new RegExp(searchOptions.keywords);}
            if (searchOptions.skills) {dbQueryObject.skills = new RegExp(searchOptions.skills);}

            var promise = jobModel.find(dbQueryObject).limit(limit).exec();
            return promise;
        } catch (error) {
            console.log(error);
        };
    },

    GetJob: function(jobId){
        return null;
    },

    UpdateJob : function(jobId, newJob){
        try {
            var job = db.jobs.findById(request.params.id).exec();
            job.set(newJob);
            var result = job.save();
            return result;
        } catch (error) {
            HandleError(err);
        }
    },

    ArchiveJob: function(jobId){
        try {
            var job = db.jobs.find({'_id':jobId}).exec();
            job.archived=true;
            var result = job.save();
            return result;
        } catch (error) {
            HandleError(error);
        }
        return false;
    },

    UnarchiveJob: function(jobId){
        try {
            var job = db.jobs.find({'_id':jobId}).exec();
            job.archived=false;
            var result = job.save();
            return result;
        } catch (error) {
            HandleError(error);
        }
        return false;
    },

    ReportJob: function(jobId){
        return false;
    },

    HandleError: function(err){
        // log error here
        console.log(err);
    }
};
