// user routes
const mongoose = require('mongoose');
const userModel = require('./../modules/users/index.js');

module.exports = function(app, db) {

    app.post('/user/register', (req, res) => {
        try{
            var userResult = userModel.CreateUser({
                title:          req.body.title,
                firstname:      req.body.firstname,
                lastname:       req.body.lastname,
                role:           req.body.role,
                email:          req.body.email,
                username:       req.body.username,
                password:       req.body.password,
                telephone:      req.body.telephone,
                created:        new Date(),
                updated:        new Date(),
                location:       req.body.location,
                public:         req.body.public,
                archived:       req.body.archived,
                skills:         req.body.skills,
                profile:        req.body.profile,
            });
            if (userResult){
                if (userResult.error == undefined){
                    res.send(userResult);
                } else {
                    res.status(500).send(JSON.stringify(userResult));
                }
            } else {
                res.status(500).send("Error- no result returned from user schema");
            }
        } catch (error){
            res.status(500).send(error.message);
        }
    });

    app.post('/user/login', (req, res) => {
        res.send('login user')
    });

    app.get('/user/logout', (req, res) => {
        res.send('log out user')
    });

    app.post('/user/update:id', (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid user Id");
        } else {
            try{
                var updatedUser = {           
                    title:          req.body.title,
                    firstname:      req.body.firstname,
                    lastname:       req.body.lastname,
                    role:           req.body.role,
                    email:          req.body.email,
                    telephone:      req.body.telephone,
                    updated:        new Date(),
                    location:       req.body.location,
                    public:         req.body.public,
                    archived:       req.body.archived,
                    skills:         req.body.skills,
                    profile:        req.body.profile,
                };
                userModel.UpdateUser(req.params.id,updatedUser)
                    .then(function(user){
                        if (user){
                           res.send(user);
                        } else {
                            res.status(500).send("Error updating user");
                        }
                    })
                } catch (error) {
                res.status(500).send(error.message);
            }
        }
    });
    
    app.delete('/user/delete:id', (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid skill Id");
        } else {
            try{
            var result = skilModel.DeleteSector(req.params.id)
                .then(function(removedSkill){
                    if (removedSkill){
                        res.send(removedSkill);
                    } else {
                        res.status(404).send("Skill was not found");
                    }
                })
            } catch (error){
                res.status(500).send(error.message);
            }
        }
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