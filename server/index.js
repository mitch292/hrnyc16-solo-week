const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Snoowrap = require('snoowrap'); //reddit api wrapper
const CONFIG = require('./../config.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


//utilize the reddit api wrapper
const reddit = new Snoowrap({
  userAgent: CONFIG.userAgent,
  clientId: CONFIG.clientId,
  clientSecret: CONFIG.clientSecret,
  username: CONFIG.username,
  password: CONFIG.password
})


app.get('/fetchMLSHighlights', (req, res) => {
  reddit.getSubreddit('mls').getHot({limit: 100})
    .then((response) => {
      let filteredResponse = []
      response.forEach((topic) => {
        //if its a highlight and has a video
        if (topic.link_flair_text === 'Highlight'&& topic.secure_media_embed.content) {
          filteredResponse.push({
            id: topic.id,
            author: topic.author,
            mediaEmbed: topic.media_embed,
            secureMediaEmbed: topic.secure_media_embed,
            redditPath: topic.permalink,
            title: topic.title,
            highlightUrl: topic.url,
            upvotes: topic.ups
          })
        }
      })
      res.send(filteredResponse)
    })
    .catch((err) => {
      console.error('there was an error fetching the highlights', err)
    })
})

app.get('/fetchMLBHighlights', (req, res) => {
  reddit.getSubreddit('baseball').getHot({limit: 100})
    .then((response) => {
      let filteredResponse = [];
      response.forEach((topic) => {
        //mlb subreddit shows all highlights as mlb media videos...
        //this ensures only videos were getting are highlights
        if (topic.link_flair_text === 'Video' && topic.url.substr(8, 22) === 'mediadownloads.mlb.com') {
          filteredResponse.push({
            id: topic.id,
            author: topic.author,
            mediaEmbed: topic.media_embed,
            secureMediaEmbed: topic.secure_media_embed,
            redditPath: topic.permalink,
            title: topic.title,
            highlightUrl: topic.url,
            upvotes: topic.ups
          })
        }
      })
      res.send(filteredResponse);
    })
    .catch((err) => {
      console.error('there was an error getting the mlb highlights', err)
    })
})



app.listen(3000, (err, success) => {
  if (err) {
    console.error('there was an error starting the server', err)
  } else {
    console.log('listening on port 3000');
  }
})