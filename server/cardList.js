"use strict";

const express = require('express'),
    cardListData = require('./cardList.data'),
    cardList = express();

module.exports = cardList.get('/', (req, res) => {
    res.send(cardListData);
}).post('/add', (req, res) => {
    let cl = Array.from(cardListData);
    cl.push({id: 2, products: [{}]});
    res.send(cl);
});
