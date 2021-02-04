const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const cors = require('cors');
const port = 3005;

var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(cors());

// Connection URL
const url = 'mongodb+srv://dmitry:sfsu667@cluster0-mxobn.mongodb.net/test?retryWrites=true&w=majority';

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
  console.log("connected to db");

  const db=client.db(dbName);

  app.get('/api/inventory/get', (req,res) => {
    db.collection('Inventory')
    .find({}).toArray( (err, result) =>{
      if( err ) console.log(err);
      res.send(result);
    });
  });

  app.post('/api/inventory/add', (req, res) => {

    console.log(req.body);

    const item = {
      title : req.body.title,
      sellerName : req.body.user,
      sellerEmail : req.body.email,
      description : req.body.description,
      stock : req.body.stock,
      picture : req.body.picture,
      itemsSold : '0',
    }

    console.log(item);

    db.collection('Inventory')
    .insertOne( item , function(err, res) {
      if(err){
        console.log(err);
      }
      console.log("1 entity is inserted into the DB");
    });
  });


  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

