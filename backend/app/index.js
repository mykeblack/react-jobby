
// routes/index.js
const apiRoutes = require('./routes/api_routes').default;
module.exports = function(app, db) { 
    apiRoutes(app, db);
  // Other route groups could go here, in the future
};
