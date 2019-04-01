const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

//const apiRoutes = require('./app/routes/api_routes').default(app, {});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', '../public/index.html'));
});

app.get('/jobs/list', function (req, res) {
  var joblist = [
    {'id': 1, 'title': 'node developer', 'posted':'Today'}, 
    {'id': 2, 'title': 'apprentice developer', 'posted':'Today'}
  ]
  return res.send(joblist);
 });


app.listen(process.env.PORT || 8080, () => {
  console.log('API is listening on port  ' + (process.env.PORT || 8080) );
});