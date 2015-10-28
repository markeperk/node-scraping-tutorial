
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var port = 9000

var scrapeController = require('./api/controllers/scrape-controller');

app.use(bodyParser.json())



//endpoints:
app.get('/scrape', scrapeController.scrape)




app.listen(port);
console.log('listening on port ' + port);

exports = module.exports = app;