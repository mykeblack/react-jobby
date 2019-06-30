const mongoose = require('mongoose');
const sectorModel = require('./../../modules/sectors/model.js');

module.exports =  {

    CreateSector : function (sectorObject){
        try {
            var loc = new sectorModel(sectorObject); 
            loc.save(function (err, result) {
                if (err) {console.log(err);}
            });
            return loc;
        } catch (error) {
            HandleError(error);
            return {error: "save failed"};
        };    
    },


    DeleteSector: async function (sectorId) {
        try{
            var promise = sectorModel.findOneAndRemove({_id: sectorId}).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "delete failed"};
        };  
    },

    GetSectors: async function(searchOptions){
        // options is the search parameters
        try{
            var pageNumber = searchOptions.pageNumber || 1;
            var resultsPerPage = searchOptions.resultsPerPage || 10;
            var sortBy = searchOptions.sortBy || 'posted';
            const skipResults = (pageNumber-1) * resultsPerPage;
            const limit = resultsPerPage * pageNumber
            // map search object to dbdbQueryObject
            var dbQueryObject= {};
            if (searchOptions.name) {dbQueryObject.name = new RegExp(searchOptions.name);}
            if (searchOptions.parent) {dbQueryObject.parent = new RegExp(searchOptions.parent);}
            
            var promise = sectorModel.find(dbQueryObject).limit(limit).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "get sectors failed"};
        }; 
    },

    GetSector: async function(sectorId){
        try{
            var promise = sectorModel.findById(sectorId).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "getsector failed"};
        }   
    },

    UpdateSector : async function(sectorId, updatedSector){
        try{
            var promise = sectorModel.findByIdAndUpdate(sectorId,{$set:updatedSector},{new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "update failed"};
        }
    },

}
