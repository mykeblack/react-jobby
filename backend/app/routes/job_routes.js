// routes/app_routes.js
// job application api calls
const mongoose  = require('mongoose');
const jobModel = require('./models/job_model');

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
            res.send('error creating job');
        }
        
    });

    app.get('/job/list', async (req, res) => {

        var joblist = [
          {'id': 1, 'title': 'remote node developer', 'posted':'Today', 'location': 'remote'}, 
          {'id': 2, 'title': 'apprentice developer', 'posted':'Today', 'location:': 'London'}
        ];

        let sector = req.body.sector;
        let location = req.body.location;
        let contract = req.body.contract;
        let jobType = reg.body.jobType;

        res.send(joblist);
    });

    // get job from database with id
    app.get('/job/:id', async (req, res) => {

        try {
            mongoose.connect('mongodb://localhost/jobby', {useNewUrlParser: true});
            var job = await JobModel.findById(req.params.id).exec();
            res.send(job);
        } catch (error) {
            res.status(500).send(error);
        }

    });

    // remove job
    app.delete('/job/delete/:id', async (req, res) => {
        try {
            var result = await JobModel.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    // update job
    app.put('/job/:id', async (req, res) => {
        try {
            var job = await JobMModel.findById(request.params.id).exec();
            job.set(request.body);
            var result = await job.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
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