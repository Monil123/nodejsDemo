var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');

// Object created for using express
var app = express();

// Path to other APIs code
var api = require('./server/api');

// Handling the CORS pre-flight policy by enabling access-control attributes
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// set body-parser as a middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// path to the dist folder, that was created using 'ng build' to
// connect the Angular front-end to node back-end
app.use(express.static(path.join(__dirname, 'dist/nodejsDemo')));

// Default api
app.use('/api', api);

// path to the 'index.html' file inside dist/nodejsDemo folder
// this is the landing page of the web-app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/nodejsDemo/index.html'));
});

app.post('/add', (req, res) => {
    var data = req.body.value + 2;
    res.send(JSON.stringify({ 'value': data}, null, 4));
});

var port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);
server.listen(port, () => console.log(`Server is listening on port ${port}`));