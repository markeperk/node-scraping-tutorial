
//3 - controller: include requires and new method

var scrapeService = require('./../services/scrape-service');


module.exports.scrape = function(req, res) {
	
	//4 - show query = req.body
	var show = "back to the future";	

	//5 - call method and pass through req.body on scrape service
	scrapeService.query(show).then(function(queryLinks) {
		// 8 - use response from initial query scrape to pass query links back to scrape service to retrieve desired data from each page
		scrapeService.scrape(queryLinks).then(function(showData) {
			// 10 - json object response of data object
			res.json(showData);	
		})
	}, 
	function(err){
		console.log(err)
	})
}

