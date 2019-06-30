const mongoose = require('mongoose');
const userModel = require('./../../modules/users/model.js');

module.exports =  {

    CreateUser : function (userObject){
        try {
            var loc = new userModel(userObject); 
            loc.save(function (err, result) {
                if (err) {console.log(err);}
            });
            return loc;
        } catch (error) {
            HandleError(error);
            return {error: "save failed"};
        };    
    },


    DeleteUser: async function (userId) {
        try{
            var promise = userModel.findOneAndRemove({_id: userId}).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "delete failed"};
        };  
    },

    GetUsers: async function(searchOptions){
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
            
            var promise = userModel.find(dbQueryObject).limit(limit).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "get users failed"};
        }; 
    },

    GetUser: async function(userId){
        try{
            var promise = userModel.findById(userId).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "getuser failed"};
        }   
    },

    UpdateUser : async function(userId, updateduser){
        try{
            var promise = userModel.findByIdAndUpdate(userId,{$set:updateduser},{new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "update failed"};
        }
    },

}
