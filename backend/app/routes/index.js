
// routes/index.js
const apiRoutes = require('./api_routes');
const appRoutes = require('./app_routes');
const jobRoutes = require('./job_routes');
const userRoutes = require('./user_routes');

module.exports = function(app, db) { 
    apiRoutes(app, db);
    appRoutes(app, db);
    jobRoutes(app, db);
    userRoutes(app, db);
};
