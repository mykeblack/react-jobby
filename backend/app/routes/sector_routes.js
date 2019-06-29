// sector routes

module.exports = function(app, db) {
        
    app.post('/sector/create', (req, res) => {
        res.send('create new job sector')
    });

    app.get('/sector/list', function (req, res) {
        res.send("list sectors");
    });

    app.delete('/sector/delete', (req, res) => {
        res.send('delete skill')
    });

    app.put('/sector/update', (req, res) => {
        res.send('update skill')
    });

};