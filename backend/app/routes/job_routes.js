// routes/app_routes.js
// job application api calls
const mongoose = require('mongoose');
const jobModel = require('./../models/job_model.js');

module.exports = function(app, db) {

    app.post('/job/create', async (req, res) => {

        let job = jobModel.Createjob({
            title:          req.title,
            description:    req.description,
            posted:         DateTime.Now(),
            sector:         req.sector,
            location:       req.location,
            salary:         req.salary,
            salaryType:     req.salaryType
        });

        if (job != undefined){
            res.send('created new job' + JSON.stringify(job));
        } else {
            res.status(500).send('error creating job');
        }
        
    });

    // search for jobs
    app.get('/job/list', async (req, res) => {

        var joblist = jobModel.GetJobs({
            'sector': req.body.sector,
            'location' : req.body.location,
            'contract' : req.body.contract,
            'jobType' : reg.body.jobType,
            'minsalary' : req.body.minsalary,
            'maxsalary' : req.body.maxsalary,
            'salarytype' : req.body.salarytype,
            'posted' : req.body.posted,
            'keywords' : req.body.keywords,
            'skills' : req.body.skills,
            'includearchived' : req.body.includearchived,
            'pagenumber' : req.body.pagenumber,
            'numresults' : req.body.numresults
        });
        
        res.send(joblist);
    });


    // get job from database with id
    app.get('/job/:id', async (req, res) => {
        let job = jobModel.Getjob(req.body.jobId);
        if (job != null){
            res.send(job);
        } else {
            res.status(404).send("Job was not found");
        }
    });

    // remove job
    app.delete('/job/delete/:id', async (req, res) => {
        
    });

    // update job
    app.put('/job/:id', async (req, res) => {
        let success = jobModel.UpdateJob(req.body.)
        
    });

    // archives a job (ie makes it not live)
    app.put('/job/archive', async (req, res) => {

        try {
            var result = await JobModel.find().exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }

        //res.send('archived job')
    });

    // unarchives a job (ie makes it live again)
    app.put('/job/unarchive', async (req, res) => {
        res.send('unarchived job')
    });

    
    // report inappropriate or misleading job
    app.post('/job/report', async (req, res) => {
        res.send('unarchived job')
    });
};