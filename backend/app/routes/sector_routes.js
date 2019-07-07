// sector routes
const mongoose = require('mongoose');
const sectorModel = require('./../modules/sector/index.js');

module.exports = function(app, db) {
        
    app.post('/sector/create', (req, res) => {
        try{
            var sectorResult = sectorModel.CreateLocation({
                name:           req.body.name,
                parent:         req.body.parent
            });
            if (sectorResult){
                if (sectorResult.error == undefined){
                    res.send(sectorResult);
                } else {
                    res.status(500).send(JSON.stringify(sectorResult));
                }
            } else {
                res.status(500).send("Error- no result returned from sector schema");
            }
        } catch (error){
            res.status(500).send(error.message);
        }
    });

    app.get('/sector/list', function (req, res) {
        var sectorlist =  sectorModel.GetSectors({
            'name': req.query.name,
            'parent': req.query.parent,
            'sortBy': req.query.sortBy,
            'pageNumber' : req.query.pageNumber,
            'resultsPerPAge' : req.query.resultsPerPage
        }).then(function(sectors){
            res.send(sectors);
        });
    });

    app.delete('/sector/delete:id', (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Sector Id");
        } else {
            try{
            var result = sectorModel.DeleteSector(req.params.id)
                .then(function(removedSector){
                    if (removedSector){
                        res.send(removedSector);
                    } else {
                        res.status(404).send("Sector was not found");
                    }
                })
            } catch (error){
                res.status(500).send(error.message);
            }
        }
    });

    app.put('/sector/update:id', (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Sector Id");
        } else {
            try{
                var updatedSector = {           
                    name:       req.body.name,
                    parent:     req.body.parent
                };
                sectorModel.UpdateSector(req.params.id,updatedSector)
                    .then(function(sect){
                        if (sect){
                           res.send(sect);
                        } else {
                            res.status(500).send("Error updating sector");
                        }
                    })
                } catch (error) {
                res.status(500).send(error.message);
            }
        }
    });
}