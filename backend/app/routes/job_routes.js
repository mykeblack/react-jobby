// routes/app_routes.js
// job application api calls

module.exports = function(app, db) {

    app.post('/job/create', (req, res) => {
        res.send('create new job')
    });

    app.post('/jobs/list', function (req, res) {
        var joblist = [
          {'id': 1, 'title': 'remote node developer', 'posted':'Today', 'location': 'remote'}, 
          {'id': 2, 'title': 'apprentice developer', 'posted':'Today', 'location:': 'London'}
        ];
        return res.send("xxx" + req.body);
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
};