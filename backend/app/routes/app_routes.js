// routes/app_routes.js
// job application api calls

module.exports = function(app, db) {

    // create a new job application
    app.post('/app/create', (req, res) => {
        res.send('create job application')
    });

    // retrive history of current logged in user's job applications
    app.get('/app/list', (req, res) => {
        res.send('list job applications')
    });

    // withdraw a job application for the current logged in user
    app.delete('/app/delete', (req, res) => {
        res.send('list job applications')
    });

};