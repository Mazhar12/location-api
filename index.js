const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes/api');
const server = require('./routes/server');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/ninjago',
{useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());
// set up express app

app.use('/',server);
app.use('/api',routes);
// error handiling middleware
app.use(function(err, req, res, next){
res.status(422).send({error:err.message})
});

// listen to requests
app.listen(process.env.port || 4000, function(){
   console.log('listening for requests......');
});
