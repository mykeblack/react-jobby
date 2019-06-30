const mongoose = require('mongoose');
const skillModel = require('./../../modules/skills/model.js');

module.exports =  {

    CreateSkill : function (skillObject){
        try {
            var loc = new skillModel(skillObject); 
            loc.save(function (err, result) {
                if (err) {console.log(err);}
            });
            return loc;
        } catch (error) {
            HandleError(error);
            return {error: "save failed"};
        };    
    },


    DeleteSkill: async function (skillId) {
        try{
            var promise = skillModel.findOneAndRemove({_id: skillId}).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "delete failed"};
        };  
    },

    GetSkills: async function(searchOptions){
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
            
            var promise = skillModel.find(dbQueryObject).limit(limit).exec();
            return promise;
        } catch (error) {
            HandleError(error);
            return {error: "get skills failed"};
        }; 
    },

    GetSkill: async function(skillId){
        try{
            var promise = skillModel.findById(skillId).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "getskill failed"};
        }   
    },

    UpdateSkill : async function(skillId, updatedSkill){
        try{
            var promise = skillModel.findByIdAndUpdate(skillId,{$set:updatedSkill},{new:true}).exec();
            return promise;
        } catch (error){
            HandleError(error);
            return {error: "update failed"};
        }
    },

}
