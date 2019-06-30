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
            HandleError(error);
            return {error: "save failed"};
        };    
    },


    DeleteJob: async function (jobId) {
        try{
            var promise = jobModel.findOneAndRemove({_id: jobId}).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "delete failed"};
        };  
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
            HandleError(error);
            return {error: "get jobs failed"};
        }; 
    },

    GetJob: async function(jobId){
        try{
            var promise = jobModel.findById(jobId).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "getjob failed"};
        }   
    },

    UpdateJob : async function(jobId, updatedJob){
        try{
            var promise = jobModel.findByIdAndUpdate(jobId,{$set:updatedJob},{new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "update failed"};
        }
    },

    ArchiveJob: async function(jobId){
        try{
            var promise = jobModel.findByIdAndUpdate(jobId,{$set:{archived: true}},{multi:true,new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "archive failed"};
        }
    },

    UnarchiveJob: function(jobId){
        try{
            var promise = jobModel.findByIdAndUpdate(jobId,{$set:{archived: false}},{multi:true,new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "unarchive failed"};
        }
    },

    ReportJob: function(jobId){
        // not available in MVP - allows users to report fake job ads
        return false;
    },

    HandleError: function(err){
        // log error here
        console.log(err);
        // todo: log error to text file 
    }
};
