const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const port = 3002;


const app = express();
app.use(bodyParser());
app.use(fileUpload());

app.post('/api/uploadfile', (req, res) => {

    console.log(req.files);
    fs.writeFile(`./images/${req.files.myFile.name}`, req.files.myFile.data, {encoding: 'base64'}, function(err) {
        if(err) {
            console.log(err)
        } else {
            res.send('item uploaded successfuly')
        }
    });

});


app.listen(port, () => console.log(`Gateway on port ${port}!`))