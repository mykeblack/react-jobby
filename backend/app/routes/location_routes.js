// location routes

module.exports = function(app, db) {
        
    app.post('/location/create', async (req, res) => {
        try{
            var locResult = locationModel.CreateLocation({
                name:           req.body.name,
                parent:         req.body.parent,
                longitude:      req.body.longitude,
                latitude:       req.body.latitude
            });
            if (locResult){
                if (locResult.error == undefined){
                    res.send(locResult);
                } else {
                    res.status(500).send(JSON.stringify(locResult));
                }
            } else {
                res.status(500).send("Error- no result returned from location schema");
            }
        } catch (error){
            res.status(500).send(error.message);
        }
    });

    app.get('/location/list', async (req, res) => {
        var loclist =  locationModel.GetLocations({
            'name': req.query.name,
            'parent': req.query.parent,
            'sortBy': req.query.sortBy,
            'pageNumber' : req.query.pageNumber,
            'resultsPerPAge' : req.query.resultsPerPage
        }).then(function(jobs){
            res.send(jobs);
        });
    });

    // remove a location from the database
    app.delete('/location/delete/:id', async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Location Id");
        } else {
            try{
            var result = locationModel.DeleteLocation(req.params.id)
                .then(function(removedLoc){
                    if (removedLoc){
                        res.send(removedLoc);
                    } else {
                        res.status(404).send("Location was not found");
                    }
                })
            } catch (error){
                res.status(500).send(error.message);
            }
        }
    });

    app.put('/location/update/:id', async (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).send("Invalid Location Id");
        } else {
            try{
                var updatedJob = {           
                    name:       req.body.name,
                    parent:     req.body.parent,
                    longitude:  req.body.longitude,
                    latitude:   req.body.latitude
                };
                locationModel.UpdateLocation(req.params.id,updatedLoc)
                    .then(function(loc){
                        if (loc){
                           res.send(loc);
                        } else {
                            res.status(500).send("Error updating location");
                        }
                    })
               
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
        
    });

};