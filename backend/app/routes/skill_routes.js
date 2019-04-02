// skill routes

module.exports = function(app, db) {
        
    app.post('/skill/create', (req, res) => {
        res.send('create new skill')
    });

    app.get('/skill/list', function (req, res) {
        res.send("list skills");
    });

    // remove a job from the database
    app.delete('/skill/delete', (req, res) => {
        res.send('delete skill')
    });

    // archives a job (ie makes it not live)
    app.put('/skill/update', (req, res) => {
        res.send('update skill')
    });

};