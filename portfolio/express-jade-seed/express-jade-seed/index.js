var express = require('express');
var app = express();
var path = require('path');

app.use('/vendor', express.static('./bower_components'));
app.use('/assets', express.static('./dist'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey'});
});

app.get('/team', function (req, res) {
  res.render('team', { title: 'blah' });
});

app.listen('4000', function(){
	console.log('listening on 4000');
});
