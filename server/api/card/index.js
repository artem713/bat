'use strict';

const express = require('express'),
    router = express.Router(),
    CardController = require('./card.controller')();

router.route('')
    .get((req, res) => {
        CardController
            .get()
            .then(data => res.send(data))
            .catch(err => console.error(err.message));
    })
    .post((req, res) => {
        CardController
            .add(req.body.title, req.body.actualDate)
            .then(data => res.send(data))
    });

router.use(require('./addProduct'));

module.exports = router;