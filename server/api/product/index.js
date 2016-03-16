'use strict';

const express = require('express'),
    router = express.Router(),
    ProductController = require('./product.controller')();

router.route('')
    .get((req, res) => {
        ProductController
            .get()
            .then(data => res.send(data))
            .catch(err => console.error(err.message));
    });
//.get('/:cardId', (req, res) => {
//    ProductController
//        .getCardProducts(cardId)
//        .then(data => res.send(data))
//        .catch(err => console.error(err.message));
//})
//.post((req, res) => {
//    //let cl = Array.from(cardListData);
//    //cl.push({id: 2, products: [{}]});
//    //res.send(cl);
//});

module.exports = router;