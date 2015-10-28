//6 - scrape-service

var request = require('request');
var cheerio = require('cheerio');
var q = require('q');

module.exports = {

//7 - initial search query meant to gather links that match exact title query
	query: function(title) {
		//utilize q to create a promise
		var deferred = q.defer(),
		//ensure that the title of the movie is formatted for the query url
		target = title.trim().replace(/[,]/g, '').replace(/[ ]/g, '%20'),
		//build your query url
		base = 'http://www.imdb.com'
		url = base + '/find?q=' + target + '&s=tt&exact=true&ref_=fn_al_tt_ex';
		//utilize the request module to make an http call to your url
			//request(options, callback) takes in a url, callback function returns an error if applicable, an http.IncomingMessage object, and a response body (string, buffer or json)

			//an IncomingMessage object is created by http.Server or http.ClientRequest and passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers and data. It implements the Readable Stream interface, as well as the following additional events, methods, and properties.
		request(url, function(error, response, html) {
			if(!error) {
				//reference cheerio github

				//first you need to load in the HTML. This step in jQuery is implicit, since jQuery operates on the one, baked-in DOM. With Cheerio, we need to pass in the HTML document.
				var $ = cheerio.load(html);
				var links = [];

				//cheerio's implementation is nearly identical to jQuery's, so the API is very similar.

				//lets get the links from our query search
				$('.result_text').filter(function() {
					var data = $(this);
					if (data.find('a[href*="/title/"]').attr('href')) {
						links.push(base + data.find('a[href*="/title/"]').attr('href')) 
					}
				})
				
				//resolve our promise with the array of new links we've built
				
				deferred.resolve(links)
			} else {
				
				//set up error handling
				
				deferred.reject("rejected")
			}
		})
		return deferred.promise
	},	

	//9 - scrape method to map through each link and build desired data object for each one.
	
	scrape: function(arr) {
		//since we have an array of show links from our query, we're going to want to match that with an array of deffered promises that we will resolve using q.all
		
		var shows = arr.map(function(i) {
			var deferred = q.defer(), 
			
			//setting up a new data object for each url/ title
			
			showData = {}, url = i
			showData.url = url;
			
			//another request for each url, loading the pages html and traversing its dom.
			
			request(url, function(error, response, html) {
				if(!error) {
					var $ = cheerio.load(html);
					var genres = [], stars = [], directors = [];
					
					//title & date of show
					
					$('.header').filter(function() {
						var data = $(this);
						showData.title  = data.find(".itemprop").text().trim();
						showData.date = data.find(".nobr").text().trim();
					});
					
					//type of show
					
					$('.infobar').filter(function() {
						var data = $(this);
						showData.type = data.text().trim().substring(0, data.text().trim().indexOf("\n"));
					});
					
					//genre categories of show
					
					$('.infobar').find(".itemprop").filter(function() {
						var data = $(this);
						genres.push(data.text().trim());
					});
						showData.genres = genres
					
					//show rating
					
					$('.star-box-giga-star').filter(function() {
						var data = $(this);
						showData.rating = +data.text().trim();
					});
					
					//show director
					
					$("div[itemprop='director']").find("span[itemprop='name']").filter(function() {
						var data = $(this);
						directors.push(data.text().trim())	
					});
					
					//main actors
					
					$("div[itemprop='actors']").find("span[itemprop='name']").filter(function() {
						var data = $(this);
						stars.push(data.text().trim())	
					});
						showData.stars = stars
						showData.directors = directors

					deferred.resolve(showData)
				} else {
					deferred.reject("it was rejected, dummy")
				}
			})
		return deferred.promise
		}) //end of loop
	return q.all(shows);
	} //end of scrape
}





