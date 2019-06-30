// generic api calls

module.exports = function(app, db) {

  app.get('/ping', (req, res) => {
      res.send('pong')
  });

  app.get('/version', (req, res) => {
    res.send('1.0.0')
  });

};
