
//1 - server.js

var express = require('express');
var app = express();
var port = 9000

var scrapeController = require('./api/controllers/scrape-controller');
//The keyword require returns an object, which references the value of module.exports for a given file.



//2. endpoints:

app.get('/scrape', scrapeController.scrape)






app.listen(port);
console.log('listening on port ' + port);

exports = module.exports = app;
//A module encapsulates related code into a single unit of code. When creating a module, this can be interpreted as moving all related functions into a file. 