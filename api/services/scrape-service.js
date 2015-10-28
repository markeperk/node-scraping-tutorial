var request = require('request');
var cheerio = require('cheerio');
var q = require('q');

// module.exports.scrape = function(arr) {
module.exports = {

	query: function(arr) {
		console.log(arr);


	})
	



	// var promises = arr.map(function(i){
	// 	console.log('i');
	// 		var deferred = q.defer(), 
	// 		products = {}, target = i.trim().replace(/[,]/g, '').replace(/[ ]/g, '-'),
	// 		url = 'http://www.fashionphile.com/shop/locations/' + target;
	// 		products.url = url;

	// 		request(url, function(error, response, html) {
	// 			if(!error) {

	// 				var $ = cheerio.load(html);

	// 				$('.thumbnail').filter(function() {
	// 					var data = $(this);
	// 					products.imglinks = data.find('img')
	// 				})	


	// 				deferred.resolve(products)
	// 			} else {
	// 				deferred.reject("it was rejected, dummy")
	// 			}
	// 		})
	// 		return deferred.promise
	// 	}) //end of loop
	// return q.all(promises);
} //end of scrape


