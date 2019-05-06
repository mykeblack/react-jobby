const bodyParser    = require('body-parser');
const express       = require('express');
const mongoose      = require('mongoose');
const path          = require('path');
const app           = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/jobby';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./app/routes')(app, db);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', '/public/index.html'));
});


app.listen(process.env.PORT || 8080, () => {
  console.log('API is listening on port  ' + (process.env.PORT || 8080) );
});