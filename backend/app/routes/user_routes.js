// routes/user_routes.js
// user api calls

module.exports = function(app, db) {

    app.post('/user/create', (req, res) => {
        res.send('create new user')
    });

    app.post('/user/login', (req, res) => {
        res.send('login user')
    });

    app.post('/user/logout', (req, res) => {
        res.send('log out user')
    });

    app.post('/user/update', (req, res) => {
        res.send('updated user')
    });    
    
    app.post('/user/delete', (req, res) => {
        res.send('remove user')
    });    
    
    app.post('/user/changepassword', (req, res) => {
        res.send('change password')
    });   
    
    app.post('/user/passwordreminder', (req, res) => {
        res.send('password reminder')
    });    
    
    app.post('/user/addcv', (req, res) => {
        res.send('add cv')
    });    
    
    app.post('/user/removecv', (req, res) => {
        res.send('remove cv')
    });
        
    app.post('/user/addimage', (req, res) => {
        res.send('add image')
    });    
    
    app.post('/user/removeimage', (req, res) => {
        res.send('remove image')
    });
};