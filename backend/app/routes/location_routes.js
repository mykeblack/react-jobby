// location routes

module.exports = function(app, db) {
        
    app.post('/location/create', (req, res) => {
        res.send('create new location')
    });

    app.get('/location/list', function (req, res) {
        res.send("list locations");
    });

    // remove a location from the database
    app.delete('/location/delete', (req, res) => {
        res.send('delete location')
    });

    app.put('/location/update', (req, res) => {
        res.send('update location')
    });

};