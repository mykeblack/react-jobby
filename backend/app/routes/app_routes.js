// routes/app_routes.js
// job application api calls
const mongoose = require('mongoose');
const appModel = require('./../modules/applications/index.js');

module.exports = function(app, db) {


    app.post('/app/create', (req, res) => {
        try{
            var appResult = appModel.CreateApplication({
                jobId:          req.body.jobId,
                userId:         req.body.description,
                created:        new Date(),
                coverLetter:    req.body.coverLetter,
                cvFile:         req.body.cvFile,
                status:         req.body.status
            });
            if (appResult != undefined){
                if (appResult.error == undefined){
                    res.send(appResult);
                } else {
                    res.status(500).send(JSON.stringify(appResult));
                }
            } else {
                res.status(500).send("Error- no result returned from application schema");
            }
        } catch (error){
            res.status(500).send(error.message);
        }
    });

    app.get('/app/list', (req, res) => {
        var applist =  appModel.GetApplications({
            'jobId': req.query.jobId,
            'userId': req.query.userId,
            'skills' : req.query.skills,
            'includeArchived' : req.query.includeArchived,
            'sortBy': req.query.sortBy,
            'pageNumber' : req.query.pageNumber,
            'resultsPerPAge' : req.query.resultsPerPage
        }).then(function(apps){
            res.send(apps);
        });
    });

    app.delete('/app/delete:id', (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Application Id");
        } else {
            try{
            var result = appModel.DeleteJob(req.params.id)
                .then(function(removedApp){
                    if (removedApp){
                        res.send(removedApp);
                    } else {
                        res.status(404).send("Application was not found");
                    }
                })
            } catch (error){
                res.status(500).send(error.message);
            }
        }
    });

};