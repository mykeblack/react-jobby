// user routes

module.exports = function(app, db) {

    app.post('/user/register', (req, res) => {
        res.send('create new user')
    });

    app.post('/user/login', (req, res) => {
        res.send('login user')
    });

    app.get('/user/logout', (req, res) => {
        res.send('log out user')
    });

    app.post('/user/update', (req, res) => {
        res.send('updated user')
    });    
    
    app.delete('/user/delete', (req, res) => {
        res.send('remove user')
    });    
    
    app.put('/user/changepassword', (req, res) => {
        res.send('change password')
    });   
    
    app.get('/user/passwordreminder', (req, res) => {
        res.send('password reminder')
    });    
    
    app.post('/user/addcv', (req, res) => {
        res.send('add cv')
    });    
    
    app.put('/user/updatecv', (req, res) => {
        res.send('remove cv')
    });  

    app.delete('/user/removecv', (req, res) => {
        res.send('remove cv')
    });
        
    app.post('/user/addimage', (req, res) => {
        res.send('add image')
    });    
    
    app.delete('/user/removeimage', (req, res) => {
        res.send('remove image')
    });
    
};