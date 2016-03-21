'use strict';

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config'),
    app = express(),
    port = 9000;

mongoose.connect(config.mongo.uri);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../builds')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

app.use('/card', require('./api/card'));
app.use('/product', require('./api/product'));

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
