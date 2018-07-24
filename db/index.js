const { Client } = require('pg')
const client = new Client({
  database: 'postgres',
});

client.connect();

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
  console.log('we need to format this', params)
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

exports.fetchUserVids = fetchUserVids;
exports.saveMlbHighlight = saveMlbHighlight;
exports.saveOtherHighlight = saveOtherHighlight;

