const { Client } = require('pg')
// const client = new Client({
//   database: 'postgres',
// });

const client = new Client({
  user: 'mitch',
  host: 'hrnyc16-solo-week.c9jk9yiq6myw.us-east-1.rds.amazonaws.com',
  database: 'soloweek',
  password: 'mitchell',
  port: 5432

})

client.connect()

client.query('SELECT $1::text as message', ['Hello world!'], (err, response) => {
  if (err) {
    console.error('there was an error connecting to the db', err.stack);
  } else {
    console.log(response.rows[0].message);
  }
})

let fetchUserVids = (userId, callback) => {
  const text = 'SELECT * FROM highlights WHERE username = $1';
  const values = [userId]
  client.query(text, values, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}

let saveMlbHighlight = (params, callback) => {
  const text = 'INSERT INTO highlights (username, author, highlight_url, reddit_id, reddit_path, title, category) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [params.userId, params.author.name, params.highlightUrl, params.id, params.redditPath, params.title, params.category];
  client.query(text, values, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  })
}

let saveOtherHighlight = (params, callback) => {
  const text = 'INSERT INTO highlights (username, author, highlight_url, reddit_id, media_embed, reddit_path, secure_media_embed, title, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  const values = [params.userId, params.author.name, params.highlightUrl, params.id, params.mediaEmbed.content, params.redditPath, params.secureMediaEmbed.content, params.title, params.category];
  client.query(text, values, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  })
}

let deleteSavedHighlight = (params, callback) => {
  const text = 'DELETE FROM highlights WHERE reddit_id = $1'
  const values = [params.redditId]
  client.query(text, values, (err, response) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, response)
    }
  })
}

exports.fetchUserVids = fetchUserVids;
exports.saveMlbHighlight = saveMlbHighlight;
exports.saveOtherHighlight = saveOtherHighlight;
exports.deleteSavedHighlight = deleteSavedHighlight;

