// skill routes
const mongoose = require('mongoose');
const skillModel = require('./../modules/skills/index.js');

module.exports = function(app, db) {
        
    app.post('/skill/create', (req, res) => {
        try{
            var skillResult = skillModel.CreateSkill({
                name:           req.body.name,
                parent:         req.body.parent
            });
            if (skillResult){
                if (skillResult.error == undefined){
                    res.send(skillResult);
                } else {
                    res.status(500).send(JSON.stringify(skillResult));
                }
            } else {
                res.status(500).send("Error- no result returned from skill schema");
            }
        } catch (error){
            res.status(500).send(error.message);
        }
    });

    app.get('/skill/list', function (req, res) {
        var skillList =  skillModel.GetSkills({
            'name': req.query.name,
            'parent': req.query.parent,
            'sortBy': req.query.sortBy,
            'pageNumber' : req.query.pageNumber,
            'resultsPerPAge' : req.query.resultsPerPage
        }).then(function(skills){
            res.send(skills);
        });
    });

    // remove a skill from the database
    app.delete('/skill/delete:id', (req, res) => {
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

    // update a skill
    app.put('/skill/update:id', (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Skill Id");
        } else {
            try{
                var updatedSkill = {           
                    name:       req.body.name,
                    parent:     req.body.parent
                };
                skillModel.UpdateSkill(req.params.id,updatedSkill)
                    .then(function(skill){
                        if (skill){
                           res.send(skill);
                        } else {
                            res.status(500).send("Error updating skill");
                        }
                    })
                } catch (error) {
                res.status(500).send(error.message);
            }
        }
    });

};