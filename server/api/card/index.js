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
    })
    .put((req, res) => {
        CardController
            .update(req.body.title, req.body.actualDate)
            .then(data => res.send(data))
    });

router.put('/:id', (req, res) => {
    const data = {
        id: req.params.id,
        title: req.body.title,
        actualDate: req.body.actualDate
    };
    CardController
        .update(data)
        .then(data => res.send(data))
        .catch(err => console.error(err.message));
});

router.use(require('./addProduct'));

module.exports = router;