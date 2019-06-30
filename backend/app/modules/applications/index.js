const mongoose = require('mongoose');
const applicationModel = require('./../../modules/applications/model.js');

module.exports =  {

    CreateApplication : function (appObject){
        try {
            var loc = new applicationModel(appObject); 
            loc.save(function (err, result) {
                if (err) {console.log(err);}
            });
            return loc;
        } catch (error) {
            HandleError(error);
            return {error: "save failed"};
        };    
    },


    DeleteApplication: async function (appId) {
        try{
            var promise = applicationModel.findOneAndRemove({_id: appId}).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "delete failed"};
        };  
    },

    GetApplications: async function(searchOptions){
        // options is the search parameters
        try{
            var pageNumber = searchOptions.pageNumber || 1;
            var resultsPerPage = searchOptions.resultsPerPage || 10;
            var sortBy = searchOptions.sortBy || 'posted';
            const skipResults = (pageNumber-1) * resultsPerPage;
            const limit = resultsPerPage * pageNumber
            // map search object to dbdbQueryObject
            var dbQueryObject= {};
            if (searchOptions.jobid) {dbQueryObject.jobid = new RegExp(searchOptions.jobid);}
            if (searchOptions.userId) {dbQueryObject.userId = new RegExp(searchOptions.userId);}
            if (searchOptions.skills) {dbQueryObject.skills = new RegExp(searchOptions.skills);}

            var promise = applicationModel.find(dbQueryObject).limit(limit).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "get applications failed"};
        }; 
    },

    GetApplication: async function(appId){
        try{
            var promise = applicationModel.findById(appId).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "getapplication failed"};
        }   
    },

    UpdateApplication : async function(appId, updatedApp){
        try{
            var promise = applicationModel.findByIdAndUpdate(appId,{$set:updatedApp},{new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "update failed"};
        }
    },

}
