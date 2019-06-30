const mongoose = require('mongoose');
const jobModel = require('./../../modules/locations/model.js');

module.exports =  {

    CreateLocation : function (locObject){
        try {
            var loc = new locationModel(locObject); 
            loc.save(function (err, result) {
                if (err) {console.log(err);}
            });
            return loc;
        } catch (error) {
            HandleError(error);
            return {error: "save failed"};
        };    
    },


    DeleteLocation: async function (locId) {
        try{
            var promise = locationModel.findOneAndRemove({_id: locId}).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "delete failed"};
        };  
    },

    GetLocations: async function(searchOptions){
        // options is the search parameters
        try{
            var pageNumber = searchOptions.pageNumber || 1;
            var resultsPerPage = searchOptions.resultsPerPage || 10;
            var sortBy = searchOptions.sortBy || 'posted';
            const skipResults = (pageNumber-1) * resultsPerPage;
            const limit = resultsPerPage * pageNumber
            // map search object to dbdbQueryObject
            var dbQueryObject= {};
            if (searchOptions.parent) {dbQueryObject.parent = new RegExp(searchOptions.parent);}
            
            var promise = locationModel.find(dbQueryObject).limit(limit).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "get locations failed"};
        }; 
    },

    GetLocation: async function(locId){
        try{
            var promise = locationModel.findById(locId).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "getlocation failed"};
        }   
    },

    UpdateLocation : async function(locId, updatedLoc){
        try{
            var promise = locationModel.findByIdAndUpdate(locId,{$set:updatedLoc},{new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "update failed"};
        }
    },

}
