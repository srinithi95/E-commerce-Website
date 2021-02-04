const express = require('express');
const KafkaProducer = require('./KafkaProducer.js');
const producer = new KafkaProducer('email');
const { MongoClient } = require('mongodb');
const app = express();
const redis=require('redis');
const clientr=redis.createClient();
const port = 3006;
var bodyParser = require('body-parser');
app.use(bodyParser());
const url = 'mongodb+srv://Sri:<password>@cluster0.jht7t.mongodb.net/ecommerce?retryWrites=true&w=majority';

const dbName = 'ecommerce';

const client = new MongoClient(url);

client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
 

const db=client.db(dbName);

app.post('/api/receipts/get', (req,res) => {
      db.collection('UserInfo')
        .findOne({
            email:req.body.email
        })
        .then(doc =>{
            res.send(doc.receipts);
        })
        .catch(e=>{
        console.log(e);
       res.status(404).send('error');
    });
})

app.post('/api/receipts/create',(req,res)=>{
    let receipt_id= req.body.receipt_id;
    let date= req.body.date;
    let totalPrice= req.body.price;
    let items_purchased=[];
    items_purchased.push(req.body.items);
    let receipt = [];
    console.log(items_purchased[0][0].title);
    receipt.push(receipt_id,date,totalPrice,items_purchased);
    db.collection('UserInfo')
    .findOne({
        email:req.body.email
    })
    .then(doc=>{
        if(doc.receipts){
            db.collection('UserInfo')
            .updateOne(
                {
                    email:req.body.email},
                {
                    $push: { "receipts":receipt}
                }
                )
             .then(()=>{
              clientr.publish('myPubSubChannel',`${items_purchased[0][0].title} have been purchased`)
              console.log('Email of the receipt will be sent');
              producer.send(req.body);
              res.send('Receipt saved');              
             }
            )
              .catch(e=>{
               res.status(404).send('error404');
             }
             ) 
        }
        else{
             db.collection('UserInfo')
              .updateOne(
                {email:req.body.email},
                {
                    $set: { "receipts":receipt}
                }
                )
             .then(() =>{
              console.log('Email of the receipt will be sent');
              producer.send(req.body);
              res.send('Receipt saved');               
             })
             .catch(e=>{
               res.status(404).send('error');
             }
             ) 
    }
    });
   
});

producer.connect(() => {
  app.listen(port);
   });
});