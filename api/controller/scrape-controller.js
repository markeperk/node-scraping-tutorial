var scrapeService = require('./../service/scrape-service');


module.exports.scrape = function(req, res) {
	

	var location = ["san diego"];	

	scrapeService.scrape(location).then(function(response){
		var data = response;
		res.json(response);
	}, 
	function(err){
		console.log(err)
	})
}

