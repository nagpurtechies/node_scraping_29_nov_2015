var request = require("request");

var allNews = [];

request("https://news.google.com/", function(error, response, body) {
	allNews.push(response.headers);
});

console.log(allNews);