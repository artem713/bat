'use strict';

const express = require('express'),
    router = express.Router(),
    CardController = require('./card.controller')();

router.route('')
    .get((req, res) => {
        CardController
            .get()
            .then(data => {
                console.log(data);
                res.send(data)
            })
            .catch(err => console.error(err.message));
    })
    .post((req, res) => {
        //let cl = Array.from(cardListData);
        //cl.push({id: 2, products: [{}]});
        //res.send(cl);
    });

module.exports = router;