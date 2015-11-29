var request = require("request");
var cheerio = require("cheerio");

var getNews = function(callback) {
	request("https://news.yahoo.com/", function(error, response, body) {
		
		if (!error && response.statusCode == 200) {
			$ = cheerio.load(body);

			var allNews = [];
			$(".blended-wrapper.esc-wrapper").map(function(i, element) {
				el = $(this);
				title = el.find("h2 .titletext").text();
				url = el.find("h2 a").attr("href");
				desc = el.find(".esc-lead-snippet-wrapper").text();

				allNews.push({
					title: title,
					url: url,
					desc: desc
				})
			});
			callback(allNews);

		} else {
			console.log(error);
		}
	});
};


var counter = 0;
var start = function() {
	getNews(function(allNews) {
		console.log("request no ", ++counter);
		// console.log(allNews);
	});
}

setInterval(start, 5000);

