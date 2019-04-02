// routes/app_routes.js
// job application api calls

module.exports = function(app, db) {

    app.post('/jobs/create', (req, res) => {
        res.send('create new job')
    });

    app.post('/job/list', function (req, res) {
        var joblist = [
          {'id': 1, 'title': 'remote node developer', 'posted':'Today', 'location': 'remote'}, 
          {'id': 2, 'title': 'apprentice developer', 'posted':'Today', 'location:': 'London'}
        ];
        res.send("xxx" + req.body.body);
    });

    // remove a job from the database
    app.delete('/job/delete', (req, res) => {
        res.send('deleted job')
    });

    // archives a job (ie makes it not live)
    app.put('/job/archive', (req, res) => {
        res.send('archived job')
    });

    // unarchives a job (ie makes it live again)
    app.put('/job/unarchive', (req, res) => {
        res.send('unarchived job')
    });

    
    // report inappropriate or misleading job
    app.post('/job/report', (req, res) => {
        res.send('unarchived job')
    });
};