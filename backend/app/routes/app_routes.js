// job application api calls

module.exports = function(app, db) {


    app.post('/app/create', (req, res) => {
        res.send('create job application')
    });

    app.get('/app/list', (req, res) => {
        res.send('list job applications')
    });

    app.delete('/app/delete', (req, res) => {
        res.send('list job applications')
    });

};