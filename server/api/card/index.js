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
    });

router.use(require('./addProduct'));

module.exports = router;