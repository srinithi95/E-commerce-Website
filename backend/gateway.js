const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const redis = require('redis');
//const client = redis.createClient();
const port = process.env.PORT || 3004;

const apiProxy = httpProxy.createProxyServer();

// Function to increment counter in redis 
/*
function incrCounter() {
  client.incr('myCounter', (err, updatedValue) => {
    if(err) console.log(err);
  });
}
*/

apiProxy.on('error', (err, req, res) => {
  console.log(err)
  res.status(500).send('Proxy Error');
});
/*
app.all('/api/auth/authenticate', (req, res) => {
  //incrCounter();
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});?*/

app.all('/api/auth/create', (req, res) => {
  //incrCounter();
  apiProxy.web(req, res, {
    target: 'http://localhost:3001',
  });
});


app.all('/api/stats/get', (req, res) => {
  apiProxy.web(req,res, {
    target : 'http://localhost:3003',
  });
});

app.all('/api/inventory/get', (req, res) => {
  apiProxy.web(req,res, {
    target : 'http://localhost:3005',
  });
});

app.all('/api/inventory/add', (req, res) => {
  apiProxy.web(req,res, {
    target : 'http://localhost:3005',
  });
});

app.all('/api/receipts/create', (req, res) => {
  apiProxy.web(req,res ,{
    target: 'http://localhost:3006',
  });
});

app.all('/api/receipts/get', (req, res) => {
  apiProxy.web(req,res ,{
    target: 'http://localhost:3006',
  });
});

app.all('/mail/sendemail', (req, res) => {
  apiProxy.web(req, res , {
    target: 'http"//localhost:3007',
  });
});

app.all('/api/uploadfile', (req, res) => {
  apiProxy.web(req, res, {
    target: 'http://localhost:3002',
  });
});

app.all("*", (req, res) => {
  // front end server / react
  apiProxy.web(req, res, {
    target: 'http://localhost:3000',
  });
});

app.listen(port, () => console.log(`Gateway on port ${port}!`))