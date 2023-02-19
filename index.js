var express = require('express');
var app = express();
var PORT = 3000;

app.get('/', (req, res) => res.status(200).send('Home page'));
app.get('/about', (req, res) => res.status(200).send('About page'));

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})