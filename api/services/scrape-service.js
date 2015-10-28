//6 - scrape-service

var request = require('request');
var cheerio = require('cheerio');
var q = require('q');

module.exports = {

//7 - initial search query meant to gather links that match exact title query
	
	query: function(title) {
	
		//utilize q to create a promise


		
		//ensure that the title of the movie is formatted for the query url
		
		
		//build your query url
		

		
		//utilize the request module to make an http call to your url
			//request(options, callback) takes in a url, callback function returns an error if applicable, an http.IncomingMessage object, and a response body (string, buffer or json)

			//an IncomingMessage object is created by http.Server or http.ClientRequest and passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers and data. It implements the Readable Stream interface, as well as the following additional events, methods, and properties.
		

		
				//reference cheerio github

				//first you need to load in the HTML. This step in jQuery is implicit, since jQuery operates on the one, baked-in DOM. With Cheerio, we need to pass in the HTML document.
		


				//cheerio's implementation is nearly identical to jQuery's, so the API is very similar.

				//lets get the links from our query search
		




				//resolve our promise with the array of new links we've built



				//set up error handling

	},	

	//9 - scrape method to map through each link and build desired data object for each one.

	scrape: function(arr) {
		//since we have an array of show links from our query, we're going to want to match that with an array of deffered promises that we will resolve using q.all
		
		var shows = arr.map(function(i) {
			var deferred = q.defer(), 

			//setting up a new data object for each url/ title



			//another request for each url, loading the pages html and traversing its dom.
			
	

					//title & date of show




					//type of show




					//genre categories of show




					//show rating




					//show director




					//main actors

				


					//deferred resolve


					//else statement with reject
				} else {
					deferred.reject("it was rejected, dummy")
				}
			})
		//deferred promise
		return deferred.promise
		}) //end of loop
	return q.all(shows);
	} //end of scrape
}





