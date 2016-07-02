var google = require('./modified_google')
var request = require('request')
var cheerio = require('cheerio')

var request_from_link = function(link){
      console.log(link.title+": "+link.href);
      // BELOW ADDED CODE
      var requestOptions = {
          url: link.href,
          method: 'GET'
        }
      request(requestOptions, function (err, resp, body) {
        if ((err == null) && resp.statusCode === 200) {
          var $ = cheerio.load(body)
          var res = {
            $: $,
            body: body
          }
          console.log(res.body)
        }
      })
}

var get_data_from_google = function(search_terms){
  google.resultsPerPage = 30;
  google.timeSpan = 'h';
  var nextCounter = 0
  
  google(search_terms, function (err, res){
    if (err) console.error(err)
    
    res.links.forEach(request_from_link);
  
    if (nextCounter < 4) {
      nextCounter += 1
      if (res.next) res.next()
    }
  })
}
get_data_from_google("buyout");
// https://github.com/simov/express-admin

//http://www.spacjer.com/blog/2014/02/10/defining-node-dot-js-task-for-heroku-scheduler/