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
  reddit.search({
    query: 'highlight',
    subreddit: 'mls',
    sort: 'hot'
  })
    .then((response) => {
      console.log('the response in the server', response)
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