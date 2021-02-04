const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const port = 3001;

var bodyParser = require('body-parser');
app.use(bodyParser());

// Connection URL
const url = 'mongodb+srv://Sri:test@cluster0.jht7t.mongodb.net/ecommerce?retryWrites=true&w=majority';

// Database Name
const dbName = 'sfsu667';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Connected successfully to server');
  const db = client.db(dbName);

  app.post('/api/auth/create', (req, res) => {
    console.log('creating DB entity...');
    if(!req.body.password){
      res.send({
        valid: false   
      });
      console.log('ERROR: No password has been provided');
    }
    db.collection('UserInfo')
      .findOne({
        userId: req.body.userId
      }, function(err, result){
        if(err) {
          console.log(err);
        }

        if(result) {
          console.log("Got results!");
          console.log('ERROR: user already exists')
          res.send({
            valid: false
          });
        } else {
          console.log('No results. Creating a new user...');
          var newUser = {userId: req.body.userId, password: req.body.password, email: req.body.email, userType: req.body.userType};
          db.collection('finalUserInfo').insertOne(newUser, function(err, res) {
            if(err){
              console.log(err);
            }
            console.log("1 entity is inserted into the DB");
          })
          res.send({
            valid: true
          });

        }
      });
  });


  app.post('/api/auth/authenticate', (req, res) => {
    console.log('check login');
    if(!req.body.password){
      res.send({
        valid: false
      });
    }
    db.collection('UserInfo')
      .findOne({
        email: req.body.email
      })
      .then(doc => {
        console.log(doc);
        res.send({
          valid: doc !== null && doc.password === req.body.password, userName: doc.userId, userType: doc.userType
        });
      })
      .catch(e => {
        console.log(e);
        res.send('Error', e);
      });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});