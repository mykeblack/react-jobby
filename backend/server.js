const bodyParser    = require('body-parser');
const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const path          = require('path');
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

require('./app/routes')(app, {});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', '../public/index.html'));
});


app.listen(process.env.PORT || 8080, () => {
  console.log('API is listening on port  ' + (process.env.PORT || 8080) );
});