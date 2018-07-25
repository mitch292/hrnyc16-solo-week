const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Snoowrap = require('snoowrap'); //reddit api wrapper
const CONFIG = require('./../config.js');
const db = require('../db/index.js');

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


//fetch our highlights
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

app.get('/fetchNBAHighlights', (req, res) => {
  reddit.getSubreddit('nba').getHot({limit: 100})
    .then((response) => {
      let filteredResponse = []
      response.forEach((topic) => {
        if (topic.link_flair_text === 'Highlights') {
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
      console.error('server: there was an error fetching the nba highlights', err)
    })
})

app.get('/fetchSoccerHighlights', (req, res) => {
  reddit.getSubreddit('soccer').getHot({limit: 100})
    .then((response) => {
      let filteredResponse = [];
      response.forEach((topic) => {
        if(topic.link_flair_text === 'Media') {
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
      console.error('server: there was an error fetching the world soccer highlights', err)
    })
})

//get users saved highlights
app.get('/fetchUserHighlights', (req, res) => {
  db.fetchUserVids(req.query.id, (err, response) => {
    if (err) {
      console.error('server: there was an error getting this users data from the db', err)
    } else {
      let filteredResponse = [];
      response.rows.forEach((row) => {
        filteredResponse.push({
          id: row.reddit_id,
          author: row.author,
          mediaEmbed: row.media_embed,
          secureMediaEmbed: row.secure_media_embed,
          redditPath: row.reddit_path,
          title: row.title,
          highlightUrl: row.highlight_url,
          sport: row.category
        })
      })
      res.send(filteredResponse)
    }
  })
})

//save highlight
app.post('/saveMlbHighlight', (req, res) => {
  //first we need to remove any single quotation marks from the title for postgresql
  req.body.title.replace(/'/, "");
  db.saveMlbHighlight(req.body, (err, success) => {
    if (err) {
      console.error('error saving this highlight in the database', err)
    } else {
      res.sendStatus(201);
    }
  })
})

app.post('/saveOtherHighlight', (req, res) => {
  //first we need to remove any single quotation marks from the title for postgresql
  req.body.title.replace(/'/, "");
  db.saveOtherHighlight(req.body, (err, success) => {
    if (err) {
      console.error('error saving this highlight in the database', err)
    } else {
      res.sendStatus(201);
    }
  })
})


app.listen(3000, (err, success) => {
  if (err) {
    console.error('there was an error starting the server', err)
  } else {
    console.log('listening on port 3000');
  }
})