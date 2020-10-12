const express = require('express');
const app = express();
const port = 4000;
const pluggerComponent = require('./components/pluggers');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;

app.use(bodyParser.json());
app.use(cors())
app.use('/pluggers', pluggerComponent);
passport.use(new Strategy((username, password, cb) => {
  db.query('SELECT id, username, password FROM users WHERE username = ?', [username]).then(dbResults => {

    if(dbResults.length == 0)
    {
      return cb(null, false);
    }

    bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
      if(bcryptResult == true)
      {
        cb(null, dbResults[0]);
      }
      else
      {
        return cb(null, false);
      }
    })

  }).catch(dbError => cb(err))
}));



app.get('/hello-unprotected',
        (req, res) => res.send('Hello World!'));

app.get('/hello-protected',
        passport.authenticate('basic', { session: false }),
        (req, res) => res.send('Hello Protected World!'));


app.get('/users', (req, res) => {
  db.query('SELECT id, username FROM users').then(results => {
    res.json(results);
  })
})

app.get('/users/:id',
        passport.authenticate('basic', { session: false }),
        (req, res) => {
          db.query('SELECT id, username FROM users WHERE id = ?', [req.params.id]).then(results => {
            res.json(results);
          })
        });

app.post('/users', (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();

  if((typeof username === "string") &&
     (username.length > 4) &&
     (typeof password === "string") &&
     (password.length > 6))
  {
    bcrypt.hash(password, saltRounds).then(hash =>
      db.query('INSERT INTO users (username, password) VALUES (?,?)', [username, hash])
    )
    .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));
  }
  else {
    console.log("incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long");
    res.sendStatus(400);
  }
})



Promise.all(
  [
      db.query(`CREATE TABLE IF NOT EXISTS users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(32),
          password VARCHAR(256)
      )`),
  
      db.query(`CREATE TABLE IF NOT EXISTS plugger(
          id INT AUTO_INCREMENT PRIMARY KEY,
          digit VARCHAR(32), name VARCHAR(32), type VARCHAR(32), connector VARCHAR(32), free VARCHAR(32), electricity INT, address VARCHAR(32), city VARCHAR(32),
          lat DECIMAL(7,5), lng DECIMAL(7,5)
      )`)
     
  ]
).then(() => {
  console.log('database initialized');
  app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
  });
})
.catch(error => console.log(error));