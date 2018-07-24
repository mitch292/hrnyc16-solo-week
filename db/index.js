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
  console.log('got to the db file', userId)
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

exports.fetchUserVids = fetchUserVids

