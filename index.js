var google = require('./modified_google')
var request = require('request')
var cheerio = require('cheerio')
var get_data = function(){
  google.resultsPerPage = 30;
  google.timeSpan = 'h';
  var nextCounter = 0
  
  google('buyout', function (err, res){
    if (err) console.error(err)
   
    for (var i = 0; i < res.links.length; ++i) {
      
      var link = res.links[i];
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
            // url: newUrl,
            // query: query,
            // start: start,
            // links: [],
            $: $,
            body: body
          }
          console.log(res.body)
        }
      })
      // above added code
    }
  
    if (nextCounter < 4) {
      nextCounter += 1
      if (res.next) res.next()
    }
  })
}
get_data();
// https://github.com/simov/express-admin

//http://www.spacjer.com/blog/2014/02/10/defining-node-dot-js-task-for-heroku-scheduler/