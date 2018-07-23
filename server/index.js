const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Snoowrap = require('snoowrap'); //reddit api wrapper
const CONFIG = require('./../config.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

const reddit = new Snoowrap({
  userAgent: CONFIG.userAgent,
  clientId: CONFIG.clientId,
  clientSecret: CONFIG.clientSecret,
  username: CONFIG.username,
  password: CONFIG.password
})


app.get('/fetchHighlights', (req, res) => {
  reddit.getSubreddit('mls').getHot({limit: 100})
    .then((response) => {
      let filteredResponse = []
      response.forEach((topic) => {
        if (topic.link_flair_css_class === 'highlight') {
          filteredResponse.push(topic)
        }
      })
      console.log('the response in the server', filteredResponse)
      res.send(filteredResponse)
    })
    .catch((err) => {
      console.error('there was an error fetching the highlights', err)
    })
})



app.listen(3000, (err, success) => {
  if (err) {
    console.error('there was an error starting the server', err)
  } else {
    console.log('listening on port 3000');
  }
})