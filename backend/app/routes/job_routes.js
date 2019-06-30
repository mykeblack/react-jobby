// routes/app_routes.js
// job application api calls
const mongoose = require('mongoose');
const jobModel = require('./../modules/jobs/index.js');

module.exports = function(app, db) {

    app.post('/job/create', async (req, res) => {
        try{
            var jobResult = jobModel.CreateJob({
                title:          req.body.title,
                description:    req.body.description,
                posted:         new Date(),
                updated:        new Date(),
                sector:         req.body.sector,
                location:       req.body.location,
                minSalary:      req.body.minSalary,
                maxSalary:      req.body.maxSalary,
                salaryType:     req.body.salaryType,
                posterId:       req.body.poster,
                skills:         req.body.skills,
                jobTYpe:        req.body.jobType
            });
            if (jobResult != undefined){
                if (jobResult.error == undefined){
                    res.send(jobResult);
                } else {
                    res.status(500).send(JSON.stringify(jobResult));
                }
            } else {
                res.status(500).send("Error- no result returned from job schema");
            }
        } catch (error){
            res.status(500).send(error.message);
        }
        
    });

    // search for jobs by using async promise
    app.get('/job/list', async (req, res) => {
        var joblist =  jobModel.GetJobs({
            'title': req.query.title,
            'sector': req.query.sector,
            'location' : req.query.location,
            'contractType' : req.query.contractType,
            'jobType' : req.query.jobType,
            'salary' : req.query.minSalary,
            'salarytype' : req.query.salarytype,
            'posted' : req.query.posted,
            'keywords' : req.query.keywords,
            'skills' : req.query.skills,
            'includeArchived' : req.query.includearchived,
            'sortBy': req.query.sortBy,
            'pageNumber' : req.query.pageNumber,
            'resultsPerPAge' : req.query.resultsPerPage
        }).then(function(jobs){
            res.send(jobs);
        });
        
    });


    // get job from database with id
    app.get('/job/:id', async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Job Id");
        } else {
            let job = jobModel.GetJob(req.params.id)
            .then(function(job){
                if (job != null){
                    res.send(job);
                } else {
                    res.status(404).send("Job was not found");
                }
            });
            
        }
    });

    // remove job
    app.delete('/job/delete/:id', async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Job Id");
        } else {
            try{
            var result = jobModel.DeleteJob(req.params.id)
                .then(function(removedJob){
                    if (removedJob){
                        res.send(removedJob);
                    } else {
                        res.status(404).send("Job was not found");
                    }
                })
            } catch (error){
                res.status(500).send(error.message);
            }
        }
    });

    // update job
    app.put('/job/update/:id', async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Job Id");
        } else {
            try{
                var updatedJob = {           
                    title:          req.body.title,
                    description:    req.body.description,
                    updated:        new Date(),
                    sector:         req.body.sector,
                    location:       req.body.location,
                    minSalary:      req.body.minSalary,
                    maxSalary:      req.body.maxSalary,
                    salaryType:     req.body.salaryType,
                    skills:         req.body.skills,
                    jobTYpe:        req.body.jobType
                };
                jobModel.UpdateJob(req.params.id,updatedJob)
                    .then(function(job){
                        if (job != undefined){
                           res.send(job);
                        } else {
                            res.status(500).send("Error updating job");
                        }
                    })
               
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
        
    });

    // archives a job (ie makes it not live)
    app.put('/job/archive', async (req, res) => {

        try {
            var result = JobModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }

        //res.send('archived job')
    });

    // unarchives a job (ie makes it live again)
    app.put('/job/unarchive', async (req, res) => {
        if (jobModel.UnarchiveJob(req.body.jobId)){
            res.send('unarchived job');
        } else {
            res.status(500).send('Could not unarchive job');
        }
    });

    
    // report inappropriate or misleading job
    app.post('/job/report', async (req, res) => {
        res.send('unarchived job')
    });
};